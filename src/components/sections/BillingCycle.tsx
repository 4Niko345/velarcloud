'use client'

import { createContext, useContext, useState } from 'react'

export type BillingCycle = 'monthly' | 'yearly'

const BillingContext = createContext<{ cycle: BillingCycle; setCycle: (cycle: BillingCycle) => void }>({
  cycle: 'monthly',
  setCycle: () => {},
})

/** Holds the Monthly/Yearly choice for one pricing section. The cards inside stay server-rendered. */
export function BillingProvider({ children }: { children: React.ReactNode }) {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  return <BillingContext.Provider value={{ cycle, setCycle }}>{children}</BillingContext.Provider>
}

type BillingToggleProps = {
  label: string
  monthlyLabel: string
  yearlyLabel: string
  savingsLabel?: string | null
}

export function BillingToggle({ label, monthlyLabel, yearlyLabel, savingsLabel }: BillingToggleProps) {
  const { cycle, setCycle } = useContext(BillingContext)
  const button = (active: boolean) =>
    `inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-ink ${
      active ? 'bg-ink-950 text-white shadow-sm' : 'text-muted hover:text-foreground'
    }`

  return (
    <div role="group" aria-label={label} className="mx-auto mt-10 flex w-fit rounded-full border border-border bg-surface p-1">
      <button
        type="button"
        aria-pressed={cycle === 'monthly'}
        onClick={() => setCycle('monthly')}
        className={button(cycle === 'monthly')}
      >
        {monthlyLabel}
      </button>
      <button
        type="button"
        aria-pressed={cycle === 'yearly'}
        onClick={() => setCycle('yearly')}
        className={button(cycle === 'yearly')}
      >
        {yearlyLabel}{' '}
        {savingsLabel && (
          <span
            className={`rounded-full px-2 py-0.5 text-[0.7rem] font-semibold transition-colors duration-200 ${
              cycle === 'yearly' ? 'bg-gold text-ink-950' : 'bg-gold/15 text-gold-ink ring-1 ring-gold/35'
            }`}
          >
            {savingsLabel}
          </span>
        )}
      </button>
    </div>
  )
}

type PlanPriceProps = {
  monthly: string
  yearly?: string | null
  period?: string | null
  /** Shown under the price while Yearly is selected, e.g. "Laskutetaan vuosittain $924/v". */
  yearlyNote?: string | null
  dark: boolean
}

export function PlanPrice({ monthly, yearly, period, yearlyNote, dark }: PlanPriceProps) {
  const { cycle } = useContext(BillingContext)
  const showYearly = cycle === 'yearly' && Boolean(yearly)
  const price = showYearly ? yearly : monthly

  return (
    <div className="mt-5">
      <p className="flex items-baseline gap-1.5">
        {/* New key per price, so the fade-in replays on every switch. */}
        <span key={price} className="font-display text-5xl font-semibold tracking-tight motion-safe:animate-price-in">
          {price}
        </span>
        {period && <span className={`text-sm ${dark ? 'text-white/70' : 'text-muted'}`}>{period}</span>}
      </p>
      {yearly && yearlyNote && (
        // Space is kept while hidden so switching never shifts the cards.
        <p
          aria-hidden={!showYearly}
          className={`mt-1 text-xs transition-opacity duration-300 ${showYearly ? 'opacity-100' : 'opacity-0'} ${
            dark ? 'text-gold' : 'text-gold-ink'
          }`}
        >
          {yearlyNote}
        </p>
      )}
    </div>
  )
}
