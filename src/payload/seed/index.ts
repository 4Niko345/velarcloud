/**
 * Fills an empty database with the front page and site settings in Finnish
 * and English. Skips anything that already exists unless run with --force.
 *
 *   npm run seed
 *   npm run seed -- --force   # overwrite the home page and site settings
 */
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import config from '../../../payload.config'
import { defaultLocale, locales, type Locale } from '../../i18n/config'
import { homePage, siteSettings, type Localized } from './content'

type Data = Record<string, unknown>

const isLocalized = (value: unknown): value is Localized =>
  typeof value === 'object' &&
  value !== null &&
  Object.keys(value).length === 2 &&
  typeof (value as Localized).fi === 'string' &&
  typeof (value as Localized).en === 'string'

/** Replaces every t(fi, en) pair with the string for `locale`. */
function pick(value: unknown, locale: Locale): unknown {
  if (isLocalized(value)) return value[locale]
  if (Array.isArray(value)) return value.map((item) => pick(item, locale))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, pick(item, locale)]))
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

const force = process.argv.includes('--force')
const otherLocales = locales.filter((code) => code !== defaultLocale)
const payload = await getPayload({ config })

// Front page
const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'home' } },
  limit: 1,
  depth: 0,
  draft: true,
})

if (existing.docs[0] && !force) {
  payload.logger.info('Home page exists, skipping (use --force to overwrite).')
} else {
  const data = { ...(pick(homePage, defaultLocale) as Data), _status: 'published' }
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
        ...(withIds(pick(homePage, locale), saved) as Data),
        _status: 'published',
      } as Partial<RequiredDataFromCollectionSlug<'pages'>>,
    })
  }
  payload.logger.info(`Home page seeded (${locales.join(', ')}).`)
}

// Site settings
const settings = await payload.findGlobal({ slug: 'site-settings', locale: defaultLocale, depth: 0 })

if (settings.trialUrl && !force) {
  payload.logger.info('Site settings exist, skipping (use --force to overwrite).')
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
