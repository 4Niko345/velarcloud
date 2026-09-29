import { localePath, type Locale } from '@/i18n/config'
import type { SiteSetting } from '@/payload/payload-types'

export type CtaLink = {
  label: string
  kind: 'trial' | 'booking' | 'custom'
  appearance: 'primary' | 'secondary'
  url?: string | null
}

/**
 * Turns a stored href into a public one. "#pricing" becomes "/#pricing" or
 * "/en#pricing" so menu links also work from subpages; "/terms" gets the
 * locale prefix; absolute URLs and mailto: pass through.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (href.startsWith('#')) return `${localePath(locale)}${href}`
  if (href.startsWith('/')) return localePath(locale, href)
  return href
}

export const isExternal = (href: string) => /^(https?:)?\/\//.test(href)

/** Target of a CTA link: trial/booking come from Site settings. Null when not configured. */
export function resolveLink(
  link: Pick<CtaLink, 'kind' | 'url'>,
  settings: Pick<SiteSetting, 'trialUrl' | 'bookingUrl'>,
  locale: Locale,
): string | null {
  const raw =
    link.kind === 'trial' ? settings.trialUrl : link.kind === 'booking' ? settings.bookingUrl : link.url
  return raw ? localizeHref(raw, locale) : null
}
