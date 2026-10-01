// Single source for the site's languages. Used by payload.config.ts (content
// localization), src/proxy.ts (URL routing) and the frontend.

export const locales = ['fi', 'en'] as const
export type Locale = (typeof locales)[number]

/** Served without a URL prefix: "/" is Finnish, "/en" is English. */
export const defaultLocale: Locale = 'fi'

export const localeNames: Record<Locale, { short: string; name: string; og: string }> = {
  fi: { short: 'FI', name: 'Suomi', og: 'fi_FI' },
  en: { short: 'EN', name: 'English', og: 'en_US' },
}

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

/** Public path for `path` in `locale`, e.g. ('en', '/') → '/en', ('fi', '/terms') → '/terms'. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/**
 * The blog's URL segment per language. Internally the route is app/(frontend)/[lang]/blog;
 * src/proxy.ts maps /blogi/… onto it for Finnish.
 */
export const blogSegment: Record<Locale, string> = { fi: 'blogi', en: 'blog' }

/** ('fi') → '/blogi', ('en', 'my-post') → '/en/blog/my-post'. */
export const blogPath = (locale: Locale, slug?: string): string =>
  localePath(locale, `/${blogSegment[locale]}${slug ? `/${slug}` : ''}`)
