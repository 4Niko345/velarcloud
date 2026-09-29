import { Check } from 'lucide-react'
import { resolveLink } from '@/lib/links'
import type { PricingBlock } from '@/payload/payload-types'
import { BrandLogo, brandMentionedIn } from '@/components/brands/BrandLogo'
import { icons } from '@/components/icons'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { container, SectionHeader, type SectionContext } from './shared'

export function Pricing({ block, ctx }: { block: PricingBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-white py-20 sm:py-24">
      <div className={container}>
        <SectionHeader id={headingId} eyebrow={block.eyebrow} heading={block.heading} text={block.text} />

        <ul className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:items-center">
          {(block.plans ?? []).map((plan) => {
            const dark = Boolean(plan.highlighted)
            const href = plan.link?.label ? resolveLink(plan.link, ctx.settings, ctx.locale) : null
            const PlanIcon = plan.icon ? icons[plan.icon] : null
            return (
              <li
                key={plan.id ?? plan.name}
                className={`flex flex-col rounded-3xl p-6 sm:p-8 ${
                  dark
                    ? 'bg-ink-950 text-white shadow-2xl shadow-ink-950/30 ring-1 ring-gold/60 lg:py-12'
                    : 'border border-border bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {PlanIcon && (
                      <span
                        className={`flex size-10 items-center justify-center rounded-xl ring-1 ${
                          dark ? 'bg-gold/10 text-gold ring-gold/40' : 'bg-ink-950 text-gold ring-gold/30'
                        }`}
                      >
                        <PlanIcon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
                      </span>
                    )}
                    <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                  </div>
                  {plan.badge && (
                    <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink-950">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-5xl font-semibold tracking-tight">{plan.price}</span>
                  {plan.period && (
                    <span className={`text-sm ${dark ? 'text-white/70' : 'text-muted'}`}>{plan.period}</span>
                  )}
                </p>
                {plan.description && (
                  <p className={`mt-4 leading-relaxed ${dark ? 'text-white/75' : 'text-muted'}`}>
                    {plan.description}
                  </p>
                )}

                {href && (
                  <ButtonLink
                    href={href}
                    appearance={dark ? 'primary' : plan.link.appearance}
                    onDark={dark}
                    className="mt-7 w-full"
                  >
                    {plan.link.label}
                  </ButtonLink>
                )}

                {plan.features && plan.features.length > 0 && (
                  <div className={`mt-8 border-t pt-6 ${dark ? 'border-white/10' : 'border-border'}`}>
                    {plan.featuresHeading && <p className="text-sm font-semibold">{plan.featuresHeading}</p>}
                    <ul className="mt-4 space-y-3 text-sm">
                      {plan.features.map((feature) => {
                        // "WhatsApp-integraatio" gets the WhatsApp mark instead of a check.
                        const brand = brandMentionedIn(feature.text)
                        const markColor = dark ? 'text-gold' : 'text-gold-ink'
                        return (
                          <li key={feature.id ?? feature.text} className="flex gap-3">
                            {brand ? (
                              <BrandLogo brand={brand} size={16} className={`mt-0.5 ${markColor}`} decorative />
                            ) : (
                              <Check className={`mt-0.5 size-4 shrink-0 ${markColor}`} aria-hidden />
                            )}
                            <span className={dark ? 'text-white/85' : 'text-foreground/80'}>{feature.text}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        {block.note && <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">{block.note}</p>}
      </div>
    </section>
  )
}
