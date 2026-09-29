import { cache } from 'react'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getPayloadClient } from './payload'

/** Published page by slug in `locale` (untranslated fields fall back to Finnish), or null. Cached per request. */
export const getPageBySlug = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    locale,
    fallbackLocale: defaultLocale,
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
})
