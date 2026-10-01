import { HeroBackground } from './sections/HeroBackground'

type PageHeaderProps = {
  eyebrow?: string | null
  title: string
  intro?: string | null
  /** Small line above the title, e.g. a back link or the article date. */
  children?: React.ReactNode
}

/** Navy title band for pages that don't start with a hero (blog index, articles). */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden bg-navy-950 text-white">
      <HeroBackground />
      <div className="mx-auto max-w-3xl px-4 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        {children}
        {eyebrow && (
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-brand-soft">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
      </div>
    </header>
  )
}
