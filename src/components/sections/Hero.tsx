import Image from 'next/image'
import { CalendarCheck, Check, Workflow } from 'lucide-react'
import type { Dictionary } from '@/i18n/dictionaries'
import { resolveLink } from '@/lib/links'
import type { HeroBlock } from '@/payload/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { container, type SectionContext } from './shared'

export function Hero({ block, ctx }: { block: HeroBlock; ctx: SectionContext }) {
  const image = typeof block.image === 'object' ? block.image : null

  return (
    <section id={block.anchor || undefined} className="relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-48 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand/35 blur-3xl lg:left-3/4" />
        <div className="absolute -bottom-48 -left-24 size-96 rounded-full bg-sky/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      </div>

      <div
        className={`${container} grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:pb-28 lg:pt-24`}
      >
        <div>
          {block.eyebrow && (
            <p className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-sky">
              {block.eyebrow}
            </p>
          )}
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {block.heading}
          </h1>
          {block.text && <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{block.text}</p>}

          {block.links && block.links.length > 0 && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {block.links.map((link) => {
                const href = resolveLink(link, ctx.settings, ctx.locale)
                return (
                  href && (
                    <ButtonLink key={link.id ?? href} href={href} appearance={link.appearance} onDark>
                      {link.label}
                    </ButtonLink>
                  )
                )
              })}
            </div>
          )}

          {block.highlights && block.highlights.length > 0 && (
            <ul className="mt-8 flex flex-col gap-2.5 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {block.highlights.map((item) => (
                <li key={item.id ?? item.text} className="flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-sky" aria-hidden />
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width ?? 1200}
            height={image.height ?? 900}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
            priority
          />
        ) : (
          <HeroIllustration labels={ctx.dict.illustration} />
        )}
      </div>
    </section>
  )
}

/** Decorative pipeline board, shown when no screenshot is uploaded. */
function HeroIllustration({ labels }: { labels: Dictionary['illustration'] }) {
  const cards = [3, 2, 2]
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-md px-2 lg:max-w-none">
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/40 backdrop-blur sm:p-5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs font-semibold text-white/70">{labels.pipeline}</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
          {labels.stages.map((stage, column) => (
            <div key={stage} className="rounded-xl bg-navy-900/80 p-2 sm:p-2.5">
              <p className="truncate text-[0.65rem] font-semibold uppercase tracking-wider text-white/55">{stage}</p>
              <div className="mt-2 space-y-2">
                {Array.from({ length: cards[column] }, (_, row) => (
                  <div key={row} className="rounded-lg border border-white/10 bg-white/[0.07] p-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`size-4 shrink-0 rounded-full ${column === 2 ? 'bg-emerald-400/80' : 'bg-sky/70'}`}
                      />
                      <span className="h-1.5 w-full rounded-full bg-white/25" />
                    </div>
                    <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-white/15" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-6 left-0 flex items-center gap-3 rounded-xl bg-white p-3 pr-4 text-navy-900 shadow-xl sm:-left-6">
        <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
          <Workflow className="size-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
            {labels.automation}
          </span>
          <span className="text-sm font-semibold">{labels.automationStatus}</span>
        </span>
      </div>

      <div className="absolute -top-5 right-0 flex items-center gap-2.5 rounded-xl bg-white p-2.5 pr-3.5 text-navy-900 shadow-xl sm:-right-4">
        <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
          <CalendarCheck className="size-4" />
        </span>
        <span className="text-sm font-semibold">{labels.booking}</span>
      </div>
    </div>
  )
}
