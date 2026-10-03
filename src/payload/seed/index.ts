/**
 * Fills an empty database with the site's pages (home, pricing, contact), their
 * photos, the contact form and the site settings, in Finnish and English. Skips
 * anything that already exists unless run with "force".
 *
 *   npm run seed
 *   npm run seed -- force   # overwrite the seeded pages and site settings
 *
 * (A positional word, not --force: `payload run` passes only positional arguments on.)
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '../../../payload.config'
import { defaultLocale, locales, type Locale } from '../../i18n/config'
import { forms, mediaFiles, pages, siteSettings, type FormKey, type Localized, type MediaKey } from './content'

type Data = Record<string, unknown>

const mediaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'media')

const isLocalized = (value: unknown): value is Localized =>
  typeof value === 'object' &&
  value !== null &&
  Object.keys(value).length === 2 &&
  typeof (value as Localized).fi === 'string' &&
  typeof (value as Localized).en === 'string'

/** Rich text in the editor's (Lexical) format: one paragraph per line. */
const lexical = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: text.split('\n').map((line) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      textFormat: 0,
      textStyle: '',
      children: [{ type: 'text', text: line, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
    })),
  },
})

/** Replaces every t(fi, en) pair with the string for `locale`, and richText() with editor content. */
function pick(value: unknown, locale: Locale): unknown {
  if (isLocalized(value)) return value[locale]
  if (value && typeof value === 'object' && '$richText' in value) {
    return lexical((value as { $richText: Localized }).$richText[locale])
  }
  if (Array.isArray(value)) return value.map((item) => pick(item, locale))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, pick(item, locale)]))
  }
  return value
}

type Refs = { media: Record<MediaKey, number>; forms: Record<FormKey, number> }

/** Replaces every media('key') and form('key') placeholder with the created document's id. */
function withRefs(value: unknown, refs: Refs): unknown {
  if (Array.isArray(value)) return value.map((item) => withRefs(item, refs))
  if (value && typeof value === 'object') {
    if ('$media' in value) return refs.media[(value as { $media: MediaKey }).$media]
    if ('$form' in value) return refs.forms[(value as { $form: FormKey }).$form]
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, withRefs(item, refs)]))
  }
  return value
}

/**
 * Copies array-row and block ids from the saved document, so that writing the
 * next language fills the existing rows instead of replacing them.
 */
function withIds(value: unknown, saved: unknown, isRow = false): unknown {
  if (Array.isArray(value)) {
    return value.map((item, index) => withIds(item, Array.isArray(saved) ? saved[index] : undefined, true))
  }
  if (value && typeof value === 'object') {
    const savedObject = saved && typeof saved === 'object' ? (saved as Data) : {}
    const result: Data = Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, withIds(item, savedObject[key])]),
    )
    if (isRow && savedObject.id !== undefined) result.id = savedObject.id
    return result
  }
  return value
}

const force = process.argv.includes('force')
const otherLocales = locales.filter((code) => code !== defaultLocale)
const payload = await getPayload({ config })

// Photos: upload once (matched by file name), alt text in every language.
const mediaIds = {} as Record<MediaKey, number>
for (const [key, { file, alt }] of Object.entries(mediaFiles) as [MediaKey, (typeof mediaFiles)[MediaKey]][]) {
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: file } }, limit: 1, depth: 0 })
  if (existing.docs[0]) {
    mediaIds[key] = existing.docs[0].id
    continue
  }
  const created = await payload.create({
    collection: 'media',
    locale: defaultLocale,
    data: { alt: alt[defaultLocale] },
    filePath: path.join(mediaDir, file),
  })
  for (const locale of otherLocales) {
    await payload.update({ collection: 'media', id: created.id, locale, data: { alt: alt[locale] } })
  }
  mediaIds[key] = created.id
  payload.logger.info(`Uploaded ${file}.`)
}

// Forms, matched by title.
const formIds = {} as Record<FormKey, number>
for (const [key, form] of Object.entries(forms) as [FormKey, (typeof forms)[FormKey]][]) {
  const existing = await payload.find({
    collection: 'forms',
    where: { title: { equals: form.title } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0] && !force) {
    formIds[key] = existing.docs[0].id
    payload.logger.info(`Form "${form.title}" exists, skipping (run \`npm run seed -- force\` to overwrite).`)
    continue
  }

  const data = pick(form, defaultLocale) as Data
  let saved = existing.docs[0]
    ? await payload.update({
        collection: 'forms',
        id: existing.docs[0].id,
        locale: defaultLocale,
        data: data as Partial<RequiredDataFromCollectionSlug<'forms'>>,
      })
    : await payload.create({
        collection: 'forms',
        locale: defaultLocale,
        data: data as RequiredDataFromCollectionSlug<'forms'>,
      })
  for (const locale of otherLocales) {
    saved = await payload.update({
      collection: 'forms',
      id: saved.id,
      locale,
      data: withIds(pick(form, locale), saved) as Partial<RequiredDataFromCollectionSlug<'forms'>>,
    })
  }
  formIds[key] = saved.id
  payload.logger.info(`Form "${form.title}" seeded (${locales.join(', ')}).`)
}

// Pages, matched by their Finnish slug.
for (const page of pages) {
  const content = withRefs(page, { media: mediaIds, forms: formIds })
  const slug = pick(page.slug, defaultLocale) as string
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    locale: defaultLocale,
    limit: 1,
    depth: 0,
    draft: true,
  })

  if (existing.docs[0] && !force) {
    payload.logger.info(`Page "${slug}" exists, skipping (run \`npm run seed -- force\` to overwrite).`)
    continue
  }

  const data = { ...(pick(content, defaultLocale) as Data), _status: 'published' }
  let saved = existing.docs[0]
    ? await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        locale: defaultLocale,
        data: data as Partial<RequiredDataFromCollectionSlug<'pages'>>,
      })
    : await payload.create({
        collection: 'pages',
        locale: defaultLocale,
        data: data as RequiredDataFromCollectionSlug<'pages'>,
      })

  for (const locale of otherLocales) {
    saved = await payload.update({
      collection: 'pages',
      id: saved.id,
      locale,
      data: {
        ...(withIds(pick(content, locale), saved) as Data),
        _status: 'published',
      } as Partial<RequiredDataFromCollectionSlug<'pages'>>,
    })
  }
  payload.logger.info(`Page "${slug}" seeded (${locales.join(', ')}).`)
}

// Site settings
const settings = await payload.findGlobal({ slug: 'site-settings', locale: defaultLocale, depth: 0 })

if (settings.trialUrl && !force) {
  payload.logger.info('Site settings exist, skipping (run `npm run seed -- force` to overwrite).')
} else {
  let saved = await payload.updateGlobal({
    slug: 'site-settings',
    locale: defaultLocale,
    data: pick(siteSettings, defaultLocale) as Data,
  })
  for (const locale of otherLocales) {
    saved = await payload.updateGlobal({
      slug: 'site-settings',
      locale,
      data: withIds(pick(siteSettings, locale), saved) as Data,
    })
  }
  payload.logger.info(`Site settings seeded (${locales.join(', ')}).`)
}

process.exit(0)
