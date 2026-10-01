'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { localeNames, localePath, locales, type Locale } from '@/i18n/config'

type Hrefs = Record<Locale, string>

const homeHrefs = (): Hrefs => Object.fromEntries(locales.map((code) => [code, localePath(code)])) as Hrefs

/**
 * The same page in each language, read from the page's hreflang alternates
 * (set by pageMetadata). Slugs differ per language (/hinnasto vs /en/pricing),
 * so the URL alone can't tell. Falls back to each language's front page.
 */
const readAlternates = (): Hrefs => {
  const hrefs = homeHrefs()
  for (const code of locales) {
    const link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${code}"]`)
    if (link?.href) hrefs[code] = new URL(link.href, window.location.href).pathname
  }
  return hrefs
}

/** FI | EN toggle. Keeps the current page and section (#hash) when switching. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname()
  const [hrefs, setHrefs] = useState<Hrefs>(homeHrefs)

  // Re-read after every navigation so the links (also for open-in-new-tab) match the page.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from the document head
  useEffect(() => setHrefs(readAlternates()), [pathname])

  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-full border border-white/20 p-0.5 text-xs font-semibold">
        {locales.map((code) => {
          const active = code === locale
          return (
            <li key={code}>
              <a
                href={hrefs[code]}
                hrefLang={code}
                lang={code}
                aria-label={localeNames[code].name}
                aria-current={active ? 'true' : undefined}
                onClick={(event) => {
                  if (active) return
                  // Read the alternates again at click time, then keep the #section.
                  event.preventDefault()
                  window.location.assign(readAlternates()[code] + window.location.hash)
                }}
                className={`flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-soft ${
                  active ? 'bg-white text-navy-950' : 'text-white/75 hover:text-white'
                }`}
              >
                {localeNames[code].short}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
