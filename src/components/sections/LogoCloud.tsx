import Image from 'next/image'
import type { LogoCloudBlock } from '@/payload/payload-types'
import { BrandLogo, brandFromName } from '@/components/brands/BrandLogo'
import { container } from './shared'

type Item = NonNullable<LogoCloudBlock['items']>[number]

/** Uploaded logo → built-in brand mark → name as a wordmark. */
function Logo({ item }: { item: Item }) {
  const upload = typeof item.logo === 'object' ? item.logo : null
  if (upload?.url) {
    return (
      <Image
        src={upload.url}
        alt={item.name}
        title={item.name}
        width={upload.width ?? 120}
        height={upload.height ?? 40}
        className="h-7 w-auto opacity-60 grayscale transition-opacity hover:opacity-100"
      />
    )
  }
  const brand = brandFromName(item.name)
  if (brand) return <BrandLogo brand={brand} size={30} />
  return <span className="font-display text-lg font-semibold tracking-tight">{item.name}</span>
}

function LogoList({ items, hidden = false }: { items: Item[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-x-14 pr-14 sm:gap-x-20 sm:pr-20">
      {items.map((item, index) => (
        <li
          key={item.id ?? `${item.name}-${index}`}
          className="flex h-10 items-center text-foreground/60 transition-colors hover:text-gold-ink"
        >
          <Logo item={item} />
        </li>
      ))}
    </ul>
  )
}

export function LogoCloud({ block }: { block: LogoCloudBlock }) {
  const headingId = `${block.id}-heading`
  const items = block.items ?? []

  return (
    <section
      id={block.anchor || undefined}
      aria-labelledby={block.heading ? headingId : undefined}
      className="border-b border-border bg-white py-12 sm:py-14"
    >
      {block.heading && (
        <h2
          id={headingId}
          className={`${container} text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted`}
        >
          {block.heading}
        </h2>
      )}

      {/* Scrolling row; pauses on hover. The second copy only closes the loop. */}
      <div className="group mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:hidden">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <LogoList items={items} />
          <LogoList items={items} hidden />
        </div>
      </div>

      {/* Reduced motion: the same logos as a still, wrapping grid. */}
      <ul className={`${container} mt-8 hidden flex-wrap items-center justify-center gap-x-12 gap-y-6 motion-reduce:flex`}>
        {items.map((item, index) => (
          <li key={item.id ?? `${item.name}-${index}`} className="flex h-10 items-center text-foreground/60">
            <Logo item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
