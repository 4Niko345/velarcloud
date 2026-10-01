import { NextResponse, type NextRequest } from 'next/server'
import { blogSegment, defaultLocale, hasLocale, type Locale } from '@/i18n/config'

// Internal folder of the blog route: app/(frontend)/[lang]/blog.
const BLOG_ROUTE = 'blog'

/**
 * Language routing. Pages live under app/(frontend)/[lang]. The default
 * language has no prefix: "/" and "/terms" are rewritten to /fi and /fi/terms.
 * Other languages keep theirs (/en, /en/terms). A typed /fi/… address
 * redirects to the unprefixed one so every page has a single URL.
 *
 * The blog lives at each language's own segment (/blogi, /en/blog); the other
 * spelling redirects to it.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const parts = pathname.split('/').filter(Boolean)

  const redirect = (path: string) => {
    const url = request.nextUrl.clone()
    url.pathname = path
    return NextResponse.redirect(url, 308)
  }

  if (parts[0] === defaultLocale) return redirect(`/${parts.slice(1).join('/')}`)

  const prefixed = hasLocale(parts[0] ?? '')
  const locale: Locale = prefixed ? (parts[0] as Locale) : defaultLocale
  const rest = prefixed ? parts.slice(1) : parts
  const prefix = prefixed ? `/${locale}` : ''

  // Wrong blog spelling for this language (/blog in Finnish, /en/blogi in English).
  const segments = Object.values(blogSegment)
  if (rest[0] && rest[0] !== blogSegment[locale] && segments.includes(rest[0])) {
    return redirect(`${prefix}/${[blogSegment[locale], ...rest.slice(1)].join('/')}`)
  }

  const internal = rest[0] === blogSegment[locale] ? [BLOG_ROUTE, ...rest.slice(1)] : rest
  if (prefixed && internal === rest) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${[locale, ...internal].join('/')}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Everything except Payload (/admin, /api), Next internals and files such as /favicon.ico.
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
