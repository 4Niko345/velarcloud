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
  const isYearly = cycle === 'yearly'

  // Static row, colour change only: [ Monthly ] [ Yearly · Save 20% ]. No positioned or hover
  // backgrounds. Inactive text is neutral-600 (7.2:1); neutral-500 measured 4.35:1 on this pill.
  // Slightly tighter below 380px so the row keeps the page margins without wrapping.
  const button = (active: boolean) =>
    `inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black max-[379px]:gap-1.5 max-[379px]:px-3 max-[379px]:text-xs ${
      active ? 'bg-black text-white' : 'cursor-pointer bg-transparent text-neutral-600 hover:text-black'
    }`

  return (
    <div className="my-8 flex flex-row items-center justify-center">
      <div
        role="group"
        aria-label={label}
        className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 p-1"
      >
        <button
          type="button"
          aria-pressed={!isYearly}
          onClick={() => setCycle('monthly')}
          className={button(!isYearly)}
        >
          {monthlyLabel}
        </button>
        <button type="button" aria-pressed={isYearly} onClick={() => setCycle('yearly')} className={button(isYearly)}>
          {yearlyLabel}{' '}
          {savingsLabel && (
            // Inside the Yearly button, so the discount clearly belongs to yearly billing.
            // amber-800 on light amber (5.7:1); amber-300 with black text on the black active button.
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-semibold transition-colors max-[379px]:px-1.5 max-[379px]:text-[0.6875rem] ${
                isYearly ? 'bg-amber-300 text-black' : 'bg-amber-500/20 text-amber-800'
              }`}
            >
              {savingsLabel}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}

type PlanPriceProps = {
  monthly: string
  yearly?: string | null
  period?: string | null
  /** Shown under the price only while Yearly is selected, e.g. "Laskutetaan vuosittain $924/v". */
  yearlyNote?: string | null
  dark: boolean
}

export function PlanPrice({ monthly, yearly, period, yearlyNote, dark }: PlanPriceProps) {
  const { cycle } = useContext(BillingContext)
  const isYearly = cycle === 'yearly' && Boolean(yearly)
  const price = isYearly ? yearly : monthly

  return (
    <div className="mt-5">
      <p className="flex items-baseline gap-1.5">
        {/* New key per price, so the fade-in replays on every switch. */}
        <span key={price} className="font-display text-5xl font-semibold tracking-tight motion-safe:animate-price-in">
          {price}
        </span>
        {period && <span className={`text-sm ${dark ? 'text-white/70' : 'text-muted'}`}>{period}</span>}
      </p>
      {/* The annual total exists only in Yearly mode; its line height stays reserved so the cards don't jump. */}
      {yearly && yearlyNote && (
        <div className="mt-1 min-h-4">
          {isYearly && (
            <p className={`text-xs motion-safe:animate-price-in ${dark ? 'text-gold' : 'text-gold-ink'}`}>
              {yearlyNote}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
