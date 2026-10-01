import Link from 'next/link'
import { localePath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localizeHref, resolveLink } from '@/lib/links'
import type { SiteSetting } from '@/payload/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { NavLink } from './NavLink'

type SiteHeaderProps = { locale: Locale; settings: SiteSetting; dict: Dictionary }

export function SiteHeader({ locale, settings, dict }: SiteHeaderProps) {
  const nav = (settings.nav ?? []).map((item) => ({
    label: item.label,
    href: localizeHref(item.href, locale),
  }))
  const login =
    settings.loginUrl && settings.loginLabel ? { label: settings.loginLabel, href: settings.loginUrl } : null
  const ctaHref = settings.headerCta?.label ? resolveLink(settings.headerCta, settings, locale) : null
  const cta = ctaHref ? { label: settings.headerCta.label, href: ctaHref } : null

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 text-white backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link
          href={localePath(locale)}
          aria-label="Velar Cloud"
          className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-soft"
        >
          <Logo logo={settings.logo} />
        </Link>

        {nav.length > 0 && (
          <nav aria-label={dict.mainNav} className="ml-6 hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="rounded-full px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-brand-soft aria-[current=page]:bg-white/10 aria-[current=page]:text-white"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} label={dict.language} />
          {login && (
            <a
              href={login.href}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-brand-soft lg:block"
            >
              {login.label}
            </a>
          )}
          {cta && (
            // Phones get this button inside the menu instead.
            <div className="hidden sm:block">
              <ButtonLink href={cta.href} onDark>
                {cta.label}
              </ButtonLink>
            </div>
          )}
          <MobileMenu
            items={nav}
            login={login}
            cta={cta}
            labels={{ open: dict.openMenu, close: dict.closeMenu, nav: dict.mainNav }}
          />
        </div>
      </div>
    </header>
  )
}
