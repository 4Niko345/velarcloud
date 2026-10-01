'use client'

import type { ComponentProps } from 'react'
import { usePathname } from 'next/navigation'
import { localePath, locales } from '@/i18n/config'

const trimSlash = (path: string) => path.replace(/\/+$/, '') || '/'
const homePaths = new Set<string>(locales.map((locale) => localePath(locale)))

/**
 * Menu link that marks the page you are on with aria-current="page" (style it with
 * aria-[current=page]:). Sections below a menu item count too: an article under /blogi
 * marks "Blogi". Home only matches itself, and #anchor links never match.
 */
export function NavLink({ href, ...props }: ComponentProps<'a'> & { href: string }) {
  const pathname = trimSlash(usePathname())
  const target = trimSlash(href)
  const current =
    !href.includes('#') &&
    target.startsWith('/') &&
    (pathname === target || (!homePaths.has(target) && pathname.startsWith(`${target}/`)))

  return <a href={href} aria-current={current ? 'page' : undefined} {...props} />
}
