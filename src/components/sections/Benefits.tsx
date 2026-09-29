import type { BenefitsBlock } from '@/payload/payload-types'
import { icons } from '@/components/icons'
import { container, SectionHeader } from './shared'

export function Benefits({ block }: { block: BenefitsBlock }) {
  const headingId = `${block.id}-heading`

  return (
    <section
      id={block.anchor || undefined}
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-ink-900 py-20 text-white sm:py-24"
    >
      <div aria-hidden className="absolute -right-32 top-0 -z-10 size-96 rounded-full bg-gold/10 blur-3xl" />
      <div className={`${container} grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16`}>
        <SectionHeader
          id={headingId}
          eyebrow={block.eyebrow}
          heading={block.heading}
          text={block.text}
          align="left"
          onDark
        />
        <ol className="grid gap-4">
          {(block.items ?? []).map((item, index) => {
            const Icon = item.icon ? icons[item.icon] : null
            return (
            <li
              key={item.id ?? item.title}
              className="flex gap-5 rounded-2xl border border-gold/15 bg-white/[0.03] p-6"
            >
              {Icon ? (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold ring-1 ring-gold/35">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
              ) : (
                <span aria-hidden className="font-display text-2xl font-semibold text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <div>
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                {item.text && <p className="mt-1.5 leading-relaxed text-white/70">{item.text}</p>}
              </div>
            </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
