import Link from 'next/link'
import { Mail } from 'lucide-react'
import { BrandLogo, brandFromName } from '@/components/brands/BrandLogo'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizeHref } from '@/lib/links'
import type { SiteSetting } from '@/payload/payload-types'
import { Logo } from './Logo'

type SiteFooterProps = { locale: Locale; settings: SiteSetting; dict: Dictionary }

const linkClass = 'rounded hover:text-white focus-visible:outline-2 focus-visible:outline-brand-soft'
const iconLinkClass = 'inline-flex items-center gap-2.5'
const headingClass = 'text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft'

export function SiteFooter({ locale, settings, dict }: SiteFooterProps) {
  const nav = settings.nav ?? []
  const social = settings.social ?? []
  const legal = settings.legalLinks ?? []

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-sm text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link
            href={localePath(locale)}
            aria-label="Velar Cloud"
            className="inline-block rounded text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
          >
            <Logo logo={settings.logo} />
          </Link>
          {settings.footerText && <p className="mt-5 leading-relaxed">{settings.footerText}</p>}
        </div>

        {nav.length > 0 && (
          <nav aria-label={dict.footerNav}>
            <h2 className={headingClass}>{dict.explore}</h2>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.id ?? item.href}>
                  <a href={localizeHref(item.href, locale)} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {(settings.contactEmail || social.length > 0) && (
          <div>
            <h2 className={headingClass}>{dict.contact}</h2>
            <ul className="mt-4 space-y-3">
              {settings.contactEmail && (
                <li>
                  <a href={`mailto:${settings.contactEmail}`} className={`${linkClass} ${iconLinkClass}`}>
                    <Mail className="size-4 text-brand-soft" strokeWidth={1.75} aria-hidden />
                    {settings.contactEmail}
                  </a>
                </li>
              )}
              {social.map((item) => {
                const brand = brandFromName(item.platform)
                return (
                  <li key={item.id ?? item.url}>
                    <a
                      href={item.url}
                      className={`${linkClass} ${iconLinkClass}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {brand ? (
                        <BrandLogo brand={brand} size={16} className="text-brand-soft" decorative />
                      ) : (
                        <span aria-hidden className="size-4" />
                      )}
                      {item.platform}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {legal.length > 0 && (
          <div>
            <h2 className={headingClass}>{dict.legal}</h2>
            <ul className="mt-4 space-y-3">
              {legal.map((item) => (
                <li key={item.id ?? item.url}>
                  <a href={localizeHref(item.url, locale)} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          © {new Date().getFullYear()} Velar Cloud. {dict.rightsReserved}
        </p>
      </div>
    </footer>
  )
}
