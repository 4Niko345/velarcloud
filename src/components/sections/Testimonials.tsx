import Image from 'next/image'
import { Quote, Star } from 'lucide-react'
import type { TestimonialsBlock } from '@/payload/payload-types'
import { container, SectionHeader, type SectionContext } from './shared'
import { mediaSrc } from '@/lib/media'

type Item = NonNullable<TestimonialsBlock['items']>[number]

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((_, index, all) => index === 0 || index === all.length - 1)
    .join('')
    .toUpperCase()

function Stars({ rating, label }: { rating: number; label: string }) {
  const value = Math.max(1, Math.min(5, Math.round(rating)))
  return (
    <div role="img" aria-label={label.replace('{n}', String(value))} className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`size-4 ${index < value ? 'fill-amber-500 text-amber-500' : 'text-amber-500/30'}`}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  )
}

function Avatar({ item }: { item: Item }) {
  const photo = typeof item.avatar === 'object' ? item.avatar : null
  if (photo?.url) {
    return (
      <Image
        src={mediaSrc(photo.url)}
        alt=""
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-full object-cover ring-1 ring-brand/40"
      />
    )
  }
  return (
    <span
      aria-hidden
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display text-sm font-semibold text-brand-soft ring-1 ring-brand/40"
    >
      {initials(item.name)}
    </span>
  )
}

/** Real customer quotes (added in the admin). Renders nothing until there is at least one. */
export function Testimonials({ block, ctx }: { block: TestimonialsBlock; ctx: SectionContext }) {
  const items = block.items ?? []
  if (items.length === 0) return null
  const headingId = `${block.id}-heading`

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-surface py-20 sm:py-24">
      <div className={container}>
        <SectionHeader
          id={headingId}
          eyebrow={block.eyebrow}
          heading={block.heading}
          text={block.text}
          as={ctx.headingLevel}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id ?? item.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  {item.rating ? <Stars rating={item.rating} label={ctx.dict.rating} /> : <span />}
                  <Quote className="size-7 text-brand/30" strokeWidth={1.5} aria-hidden />
                </div>
                <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-foreground">
                  <p>
                    {ctx.dict.quote.open}
                    {item.quote}
                    {ctx.dict.quote.close}
                  </p>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-border pt-5">
                  <Avatar item={item} />
                  <div className="min-w-0">
                    <p className="font-semibold">{item.name}</p>
                    {item.role && <p className="text-sm text-muted">{item.role}</p>}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
