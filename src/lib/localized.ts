import { cache } from 'react'
import { locales, type Locale } from '@/i18n/config'
import { getPayloadClient } from './payload'

type SlugCollection = 'pages' | 'posts'

/** A document's slug in every language, e.g. { fi: 'hinnasto', en: 'pricing' }. Cached per request. */
export const getLocalizedSlugs = cache(
  async (collection: SlugCollection, id: number): Promise<Partial<Record<Locale, string>>> => {
    const payload = await getPayloadClient()
    const doc = await payload.findByID({ collection, id, locale: 'all', depth: 0, select: { slug: true } })
    const slugs = (doc.slug ?? {}) as unknown as Partial<Record<Locale, string | null>>
    return Object.fromEntries(locales.flatMap((code) => (slugs[code] ? [[code, slugs[code]]] : [])))
  },
)

/**
 * For a slug that doesn't exist in `locale` (e.g. /en/hinnasto): the published
 * document that has it in another language, and its slug in `locale`. Used to
 * redirect wrong-language addresses to the right one.
 */
export async function findSlugInLocale(
  collection: SlugCollection,
  slug: string,
  locale: Locale,
): Promise<string | null> {
  const payload = await getPayloadClient()
  for (const other of locales.filter((code) => code !== locale)) {
    const { docs } = await payload.find({
      collection,
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      locale: other,
      limit: 1,
      depth: 0,
      select: {},
    })
    if (docs[0]) return (await getLocalizedSlugs(collection, docs[0].id))[locale] ?? null
  }
  return null
}
