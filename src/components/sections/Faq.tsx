import { ChevronDown } from 'lucide-react'
import type { FaqBlock } from '@/payload/payload-types'
import { container, SectionHeader, type SectionContext } from './shared'

export function Faq({ block, ctx }: { block: FaqBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-surface py-20 sm:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
        <SectionHeader
          id={headingId}
          eyebrow={block.eyebrow}
          heading={block.heading}
          text={block.text}
          align="left"
          as={ctx.headingLevel}
        />
        <div className="divide-y divide-border rounded-2xl border border-border bg-white">
          {(block.items ?? []).map((item, index) => (
            // First answer starts open so the section reads as content, not a wall of closed rows.
            <details key={item.id ?? item.question} open={index === 0} className="group px-5 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 group-open:text-brand-ink"
                  aria-hidden
                />
              </summary>
              <p className="-mt-1 pb-5 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
