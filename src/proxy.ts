import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

/**
 * Language routing. Pages live under app/(frontend)/[lang]. The default
 * language has no prefix: "/" and "/terms" are rewritten to /fi and /fi/terms.
 * Other languages keep theirs (/en, /en/terms). A typed /fi/… address
 * redirects to the unprefixed one so every page has a single URL.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segment = pathname.split('/')[1]

  if (segment === defaultLocale) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  if ((locales as readonly string[]).includes(segment)) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Everything except Payload (/admin, /api), Next internals and files such as /favicon.ico.
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
