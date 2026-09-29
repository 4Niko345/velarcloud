import type { FeaturesBlock } from '@/payload/payload-types'
import { featureIcons } from './icons'
import { container, SectionHeader } from './shared'

export function Features({ block }: { block: FeaturesBlock }) {
  const headingId = `${block.id}-heading`

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-surface py-20 sm:py-24">
      <div className={container}>
        <SectionHeader id={headingId} eyebrow={block.eyebrow} heading={block.heading} text={block.text} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {(block.items ?? []).map((item) => {
            const Icon = featureIcons[item.icon]
            return (
              <li
                key={item.id ?? item.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-gold/50 hover:shadow-md motion-safe:hover:-translate-y-0.5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-gold/10 text-gold-ink ring-1 ring-gold/25">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug">{item.title}</h3>
                {item.text && <p className="mt-2 leading-relaxed text-muted">{item.text}</p>}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
