import Image from 'next/image'
import type { LogoCloudBlock } from '@/payload/payload-types'
import { container } from './shared'

export function LogoCloud({ block }: { block: LogoCloudBlock }) {
  const headingId = `${block.id}-heading`

  return (
    <section
      id={block.anchor || undefined}
      aria-labelledby={block.heading ? headingId : undefined}
      className="border-b border-border bg-white py-10 sm:py-12"
    >
      <div className={container}>
        {block.heading && (
          <h2
            id={headingId}
            className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {block.heading}
          </h2>
        )}
        <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:gap-x-10">
          {(block.items ?? []).map((item) => {
            const logo = typeof item.logo === 'object' ? item.logo : null
            return (
              <li key={item.id ?? item.name}>
                {logo?.url ? (
                  <Image
                    src={logo.url}
                    alt={item.name}
                    width={logo.width ?? 120}
                    height={logo.height ?? 40}
                    className="h-7 w-auto opacity-70 grayscale"
                  />
                ) : (
                  <span className="font-display text-base font-semibold text-muted sm:text-lg">{item.name}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
