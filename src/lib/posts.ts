import { cache } from 'react'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getPayloadClient } from './payload'

/** Published blog posts in `locale`, newest first. */
export const getPosts = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    locale,
    fallbackLocale: defaultLocale,
    sort: '-publishedAt',
    limit: 100,
    depth: 1,
  })
  return docs
})

/** Published post by slug in `locale`, or null. Cached per request. */
export const getPostBySlug = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, _status: { equals: 'published' } },
    locale,
    fallbackLocale: defaultLocale,
    limit: 1,
    depth: 1,
  })
  return docs[0] ?? null
})
