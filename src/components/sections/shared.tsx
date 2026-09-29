import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { SiteSetting } from '@/payload/payload-types'

/** What every section needs besides its own block data. */
export type SectionContext = { locale: Locale; settings: SiteSetting; dict: Dictionary }

export const container = 'mx-auto max-w-6xl px-4 sm:px-6'

type SectionHeaderProps = {
  id: string
  eyebrow?: string | null
  heading: string
  text?: string | null
  align?: 'center' | 'left'
  onDark?: boolean
}

/** Eyebrow + h2 + intro. `id` goes on the h2 for the section's aria-labelledby. */
export function SectionHeader({ id, eyebrow, heading, text, align = 'center', onDark = false }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] ${
            align === 'center' ? 'justify-center' : ''
          } ${onDark ? 'text-gold' : 'text-gold-ink'}`}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
      >
        {heading}
      </h2>
      {text && (
        <p className={`mt-4 text-lg leading-relaxed ${onDark ? 'text-white/75' : 'text-muted'}`}>{text}</p>
      )}
    </div>
  )
}
