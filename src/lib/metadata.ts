import type { Metadata } from 'next'
import { defaultLocale, localeNames, localePath, locales, type Locale } from '@/i18n/config'
import type { Page } from '@/payload/payload-types'

/** Title, description, canonical URL and hreflang alternates for `path` (e.g. "/" or "/terms"). */
export function pageMetadata(page: Page | null, locale: Locale, path: string, isHome = false): Metadata {
  const url = localePath(locale, path)
  const title = page ? (isHome ? { absolute: page.title } : page.title) : undefined
  const description = page?.description ?? undefined

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, localePath(code, path)])),
        'x-default': localePath(defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Velar Cloud',
      locale: localeNames[locale].og,
      url,
      title: page?.title,
      description,
    },
  }
}
