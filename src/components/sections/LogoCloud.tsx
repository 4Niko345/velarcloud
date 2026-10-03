import Image from 'next/image'
import type { LogoCloudBlock } from '@/payload/payload-types'
import { BrandLockup, BrandLockupDefs } from '@/components/brands/BrandLockup'
import { container } from './shared'
import { mediaSrc } from '@/lib/media'

type Item = NonNullable<LogoCloudBlock['items']>[number]

/**
 * Short lists are repeated so one copy of the row is always wider than the screen
 * (about 170 px per logo: 16 logos cover a 2560 px monitor), so no gap ever shows.
 */
const minLogosPerCopy = 16
/** Scroll speed: each logo takes this long to pass, whatever the number of logos. */
const secondsPerLogo = 3.5

/** Uploaded logo (as is), otherwise the built-in full-colour brand logo. */
function Logo({ item }: { item: Item }) {
  const upload = typeof item.logo === 'object' ? item.logo : null
  if (upload?.url) {
    return (
      <Image
        src={mediaSrc(upload.url)}
        alt={item.name}
        width={upload.width ?? 160}
        height={upload.height ?? 48}
        className="h-8 w-auto sm:h-9"
      />
    )
  }
  return <BrandLockup name={item.name} />
}

/**
 * One copy of the row. The trailing padding equals the gap, so two copies side by
 * side are evenly spaced across the seam.
 */
function LogoRow({ items }: { items: Item[] }) {
  return (
    <ul className="flex shrink-0 items-center gap-x-12 pr-12 sm:gap-x-16 sm:pr-16">
      {items.map((item, index) => (
        <li key={`${item.id ?? item.name}-${index}`} className="flex h-12 items-center">
          <Logo item={item} />
        </li>
      ))}
    </ul>
  )
}

/**
 * Integrations: an endless, steadily scrolling row of logos in full colour.
 *
 * Two identical copies sit side by side and the track moves left by exactly one copy
 * (-50%, see `marquee` in globals.css), then starts over, so the loop has no visible
 * seam. Nothing reacts to the pointer, so the row never pauses, jumps or restarts.
 * With reduced motion the logos are a still, wrapping grid instead.
 */
export function LogoCloud({ block }: { block: LogoCloudBlock }) {
  const headingId = `${block.id}-heading`
  const items = block.items ?? []
  if (items.length === 0) return null

  const copy = Array.from({ length: Math.ceil(minLogosPerCopy / items.length) }, () => items).flat()
  // Set on the element itself: the default lives in --animate-marquee (globals.css).
  const speed = { animationDuration: `${copy.length * secondsPerLogo}s` }

  return (
    <section
      id={block.anchor || undefined}
      aria-labelledby={block.heading ? headingId : undefined}
      className="relative border-b border-border bg-white py-12 sm:py-14"
    >
      <BrandLockupDefs />

      {block.heading && (
        <h2
          id={headingId}
          className={`${container} text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted`}
        >
          {block.heading}
        </h2>
      )}

      {/* The moving row is decoration for sighted users; the list below names each brand once. */}
      <div
        aria-hidden
        className="mt-8 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:hidden"
      >
        <div className="flex w-max animate-marquee will-change-transform" style={speed}>
          <LogoRow items={copy} />
          <LogoRow items={copy} />
        </div>
      </div>

      {/* Screen readers: always. Sighted users: only with reduced motion, as a still grid. */}
      <ul
        className={`${container} sr-only flex-wrap items-center justify-center gap-x-12 gap-y-6 motion-reduce:not-sr-only motion-reduce:mt-8 motion-reduce:flex`}
      >
        {items.map((item, index) => (
          <li key={item.id ?? `${item.name}-${index}`} className="flex h-12 items-center">
            <Logo item={item} />
          </li>
        ))}
      </ul>
    </section>
  )
}
