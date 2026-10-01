import type { Metadata } from 'next'
import { defaultLocale, localeNames, type Locale } from '@/i18n/config'

type PageMetadataArgs = {
  title?: string | null
  description?: string | null
  locale: Locale
  /** This page's public path in each language, e.g. { fi: '/hinnasto', en: '/en/pricing' }. */
  paths: Partial<Record<Locale, string>>
  /** Use the title as-is instead of "Title | Velar Cloud" (front page). */
  absoluteTitle?: boolean
  type?: 'website' | 'article'
}

/**
 * Title, description, canonical URL and hreflang alternates. The alternates are
 * also what the language switcher follows, so they must point at real pages.
 */
export function pageMetadata({
  title,
  description,
  locale,
  paths,
  absoluteTitle = false,
  type = 'website',
}: PageMetadataArgs): Metadata {
  const url = paths[locale]
  const languages: Record<string, string> = Object.fromEntries(
    Object.entries(paths).filter(([, path]) => Boolean(path)),
  )
  if (paths[defaultLocale]) languages['x-default'] = paths[defaultLocale]

  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description: description ?? undefined,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      siteName: 'Velar Cloud',
      locale: localeNames[locale].og,
      url,
      title: title ?? undefined,
      description: description ?? undefined,
    },
  }
}
