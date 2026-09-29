import type { FeaturesBlock } from '@/payload/payload-types'
import { BrandLogo } from '@/components/brands/BrandLogo'
import { icons } from '@/components/icons'
import { container, SectionHeader, type SectionContext } from './shared'

export function Features({ block, ctx }: { block: FeaturesBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-surface py-20 sm:py-24">
      <div className={container}>
        <SectionHeader id={headingId} eyebrow={block.eyebrow} heading={block.heading} text={block.text} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {(block.items ?? []).map((item) => {
            const Icon = icons[item.icon]
            const brands = item.brands ?? []
            return (
              <li
                key={item.id ?? item.title}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-gold/50 hover:shadow-md motion-safe:hover:-translate-y-0.5"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-ink-950 text-gold shadow-sm ring-1 ring-gold/30 transition-colors group-hover:text-gold-soft">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{item.title}</h3>
                {item.text && <p className="mt-2 leading-relaxed text-muted">{item.text}</p>}

                {brands.length > 0 && (
                  <div className="mt-auto flex items-center gap-3 pt-6">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      {ctx.dict.integrations}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-border" />
                    <ul className="flex items-center gap-2.5">
                      {brands.map((brand) => (
                        <li key={brand} className="text-foreground/60 transition-colors group-hover:text-gold-ink">
                          <BrandLogo brand={brand} size={16} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
