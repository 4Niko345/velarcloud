import { cache } from 'react'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getPayloadClient } from './payload'

/** Site settings global in `locale`. Cached per request (layout and pages share it). */
export const getSiteSettings = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({
    slug: 'site-settings',
    locale,
    fallbackLocale: defaultLocale,
    depth: 1,
  })
})
