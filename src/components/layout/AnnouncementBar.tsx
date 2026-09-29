import { ArrowRight, Sparkles } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { resolveLink } from '@/lib/links'
import type { SiteSetting } from '@/payload/payload-types'

/** Thin gold bar above the header (Site settings → Announcement bar). The whole bar is the link. */
export function AnnouncementBar({ locale, settings }: { locale: Locale; settings: SiteSetting }) {
  const announcement = settings.announcement
  if (!announcement?.enabled || !announcement.text) return null

  const href = resolveLink(announcement, settings, locale)
  const inner =
    'mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium tracking-wide text-ink-950 sm:px-6 sm:text-[0.8125rem]'

  const content = (
    <>
      <Sparkles className="size-3.5 shrink-0" aria-hidden />
      <span>{announcement.text}</span>{' '}
      {/* Spaces keep the link's accessible name "text label", not "textlabel". */}
      {href && announcement.label && (
        <span className="hidden font-semibold underline decoration-ink-950/35 underline-offset-4 transition-colors group-hover:decoration-ink-950 sm:inline">
          {announcement.label}
        </span>
      )}
      {href && (
        <ArrowRight
          className="size-3.5 shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  )

  return (
    <div className="bg-[linear-gradient(90deg,var(--color-gold-strong),var(--color-gold-soft)_50%,var(--color-gold-strong))]">
      {href ? (
        <a
          href={href}
          className={`group ${inner} focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-ink-950`}
        >
          {content}
        </a>
      ) : (
        <p className={inner}>{content}</p>
      )}
    </div>
  )
}
