'use client'

import { useEffect, useId, useState } from 'react'
import { Menu, X } from 'lucide-react'

type NavLink = { label: string; href: string }

type MobileMenuProps = {
  items: NavLink[]
  login: NavLink | null
  cta: NavLink | null
  labels: { open: string; close: string; nav: string }
}

/** Menu button + drop-down panel below the header, for screens under lg. */
export function MobileMenu({ items, login, cta, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="flex size-11 items-center justify-center rounded-full text-white hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-gold/15 bg-ink-950 px-4 pb-6 pt-2 shadow-2xl sm:px-6"
      >
        <nav aria-label={labels.nav}>
          <ul className="divide-y divide-white/10">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block py-3.5 text-base font-medium text-white/90 hover:text-gold-soft"
                >
                  {item.label}
                </a>
              </li>
            ))}
            {login && (
              <li>
                <a href={login.href} className="block py-3.5 text-base font-medium text-white/90 hover:text-gold-soft">
                  {login.label}
                </a>
              </li>
            )}
          </ul>
        </nav>
        {cta && (
          <a
            href={cta.href}
            onClick={close}
            className="mt-4 flex min-h-11 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-ink-950 hover:bg-gold-strong sm:hidden"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  )
}
