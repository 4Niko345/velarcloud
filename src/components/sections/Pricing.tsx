import { Check, Headset, LayoutTemplate, Megaphone, Users, Workflow, type LucideIcon } from 'lucide-react'
import { resolveLink } from '@/lib/links'
import { yearlyTotal } from '@/lib/price'
import type { PricingBlock } from '@/payload/payload-types'
import { BrandLogo, brandMentionedIn } from '@/components/brands/BrandLogo'
import { icons } from '@/components/icons'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { BillingProvider, BillingToggle, PlanPrice } from './BillingCycle'
import { container, SectionHeader, type SectionContext } from './shared'

type Plan = NonNullable<PricingBlock['plans']>[number]
type Feature = NonNullable<Plan['features']>[number]
type Category = NonNullable<Feature['category']>

// Options are defined in src/payload/blocks/Pricing.ts; headings come from the dictionary.
const categoryOrder: Category[] = ['crm', 'automation', 'website', 'marketing', 'support']
const categoryIcons: Record<Category, LucideIcon> = {
  crm: Users,
  automation: Workflow,
  website: LayoutTemplate,
  marketing: Megaphone,
  support: Headset,
}

/** Uncategorised items first, then one group per category in a fixed order. */
function groupFeatures(features: Feature[]) {
  const loose = features.filter((feature) => !feature.category)
  const groups = categoryOrder
    .map((category) => ({ category, items: features.filter((feature) => feature.category === category) }))
    .filter((group) => group.items.length > 0)
  return { loose, groups }
}

function FeatureList({ items, dark }: { items: Feature[]; dark: boolean }) {
  const markColor = dark ? 'text-gold' : 'text-gold-ink'
  return (
    <ul className="mt-3 space-y-2.5 text-sm">
      {items.map((feature) => {
        // "WhatsApp-integraatio" gets the WhatsApp mark instead of a check.
        const brand = brandMentionedIn(feature.text)
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
  )
}

export function Pricing({ block, ctx }: { block: PricingBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`
  const plans = block.plans ?? []
  const billing = block.billing
  // The switch only makes sense once at least one plan has a yearly price.
  const hasYearly = plans.some((plan) => plan.yearlyPrice)
  // "{total}" in the note becomes 12 × the plan's yearly monthly price, e.g. "$924".
  const yearlyNote = (plan: Plan) => {
    if (!plan.yearlyPrice || !billing?.yearlyNote) return null
    return billing.yearlyNote.replace('{total}', yearlyTotal(plan.yearlyPrice, ctx.locale) ?? '').trim()
  }

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-white py-20 sm:py-24">
      <div className={container}>
        <SectionHeader id={headingId} eyebrow={block.eyebrow} heading={block.heading} text={block.text} />

        <BillingProvider>
          {hasYearly && (
            <BillingToggle
              label={ctx.dict.billingPeriod}
              monthlyLabel={billing?.monthlyLabel ?? ''}
              yearlyLabel={billing?.yearlyLabel ?? ''}
              savingsLabel={billing?.savingsLabel}
            />
          )}

          <ul className={`${hasYearly ? '' : 'mt-12 lg:mt-16'} grid gap-6 lg:grid-cols-3 lg:items-center`}>
            {plans.map((plan) => {
              const dark = Boolean(plan.highlighted)
              const href = plan.link?.label ? resolveLink(plan.link, ctx.settings, ctx.locale) : null
              const PlanIcon = plan.icon ? icons[plan.icon] : null
              const { loose, groups } = groupFeatures(plan.features ?? [])
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

                  <PlanPrice
                    monthly={plan.price}
                    yearly={plan.yearlyPrice}
                    period={plan.period}
                    yearlyNote={yearlyNote(plan)}
                    dark={dark}
                  />
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

                  {(loose.length > 0 || groups.length > 0) && (
                    <div className={`mt-8 border-t pt-6 ${dark ? 'border-white/10' : 'border-border'}`}>
                      {plan.featuresHeading && <p className="text-sm font-semibold">{plan.featuresHeading}</p>}
                      {loose.length > 0 && <FeatureList items={loose} dark={dark} />}
                      {groups.map(({ category, items }) => {
                        const CategoryIcon = categoryIcons[category]
                        return (
                          <div key={category} className="mt-5">
                            <h4
                              className={`flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                                dark ? 'text-gold' : 'text-gold-ink'
                              }`}
                            >
                              <CategoryIcon className="size-3.5" strokeWidth={2} aria-hidden />
                              {ctx.dict.pricingCategories[category]}
                            </h4>
                            <FeatureList items={items} dark={dark} />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </BillingProvider>

        {block.note && <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">{block.note}</p>}
      </div>
    </section>
  )
}
