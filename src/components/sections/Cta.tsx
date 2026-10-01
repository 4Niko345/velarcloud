import { Mail } from 'lucide-react'
import { resolveLink } from '@/lib/links'
import type { CtaBlock } from '@/payload/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { container, type SectionContext } from './shared'

export function Cta({ block, ctx }: { block: CtaBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`
  const email = block.showEmail ? ctx.settings.contactEmail : null
  const Heading = ctx.headingLevel ?? 'h2'

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-white py-20 sm:py-24">
      <div className={container}>
        <div className="relative isolate overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-center text-white ring-1 ring-brand/25 sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -top-40 left-1/2 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
          <Heading id={headingId} className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {block.heading}
          </Heading>
          {block.text && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{block.text}</p>
          )}

          {block.links && block.links.length > 0 && (
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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

          {email && (
            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/75">
              <Mail className="size-4 text-brand-soft" aria-hidden />
              <a
                href={`mailto:${email}`}
                className="rounded underline decoration-brand-soft/50 underline-offset-4 hover:text-white hover:decoration-brand-soft focus-visible:outline-2 focus-visible:outline-brand-soft"
              >
                {email}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
