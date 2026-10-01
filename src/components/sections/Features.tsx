import Image from 'next/image'
import type { FeaturesBlock } from '@/payload/payload-types'
import { BrandLogo } from '@/components/brands/BrandLogo'
import { icons } from '@/components/icons'
import { container, SectionHeader, type SectionContext } from './shared'
import { mediaSrc } from '@/lib/media'

export function Features({ block, ctx }: { block: FeaturesBlock; ctx: SectionContext }) {
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
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {(block.items ?? []).map((item) => {
            const Icon = icons[item.icon]
            const brands = item.brands ?? []
            const image = typeof item.image === 'object' ? item.image : null
            const chip = 'flex size-12 items-center justify-center rounded-xl bg-navy-950 text-brand-soft shadow-sm transition-colors group-hover:text-white'
            return (
              <li
                key={item.id ?? item.title}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-brand/40 hover:shadow-md motion-safe:hover:-translate-y-0.5"
              >
                {image?.url ? (
                  // Photo on top, icon tile overlapping its lower corner.
                  <div className="relative -mx-2 -mt-2 mb-9">
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-navy-900">
                      <Image
                        src={mediaSrc(image.url)}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                      />
                    </div>
                    <span className={`absolute -bottom-6 left-4 ${chip} ring-4 ring-white`}>
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                  </div>
                ) : (
                  <span className={`${chip} ring-1 ring-brand/30`}>
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                )}
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
                        <li key={brand} className="text-foreground/60 transition-colors group-hover:text-brand-ink">
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
