'use client'

import { useParams } from 'next/navigation'
import { localeNames, localePath, locales, type Locale } from '@/i18n/config'

/** FI | EN toggle. Keeps the current page and section (#hash) when switching. */
export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const { slug } = useParams<{ slug?: string }>()

  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-full border border-gold/30 p-0.5 text-xs font-semibold">
        {locales.map((code) => {
          const href = localePath(code, slug ? `/${slug}` : '/')
          const active = code === locale
          return (
            <li key={code}>
              <a
                href={href}
                hrefLang={code}
                lang={code}
                aria-label={localeNames[code].name}
                aria-current={active ? 'true' : undefined}
                onClick={(event) => {
                  if (active || !window.location.hash) return
                  event.preventDefault()
                  window.location.assign(href + window.location.hash)
                }}
                className={`flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  active ? 'bg-gold text-ink-950' : 'text-white/75 hover:text-gold-soft'
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
