'use client'

import { createContext, useContext, useState } from 'react'

const BillingContext = createContext<{ isYearly: boolean; setIsYearly: (isYearly: boolean) => void }>({
  isYearly: false,
  setIsYearly: () => {},
})

/** Holds the Monthly/Yearly choice for one pricing section. The cards inside stay server-rendered. */
export function BillingProvider({ children }: { children: React.ReactNode }) {
  const [isYearly, setIsYearly] = useState(false)
  return <BillingContext.Provider value={{ isYearly, setIsYearly }}>{children}</BillingContext.Provider>
}

type BillingToggleProps = {
  label: string
  monthlyLabel: string
  yearlyLabel: string
  savingsLabel?: string | null
}

// Inactive text is neutral-600 (7.2:1 on the neutral-100 track); neutral-500 measured 4.35:1,
// below the 4.5:1 minimum. dark: only applies under a .dark class (see globals.css), which
// the site does not set.
const active = 'bg-white text-black shadow-sm dark:bg-black dark:text-white'
const inactive = 'cursor-pointer bg-transparent text-neutral-600 hover:text-black'
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
// Slightly tighter below 380px so both buttons stay in one row inside the page margins.
const compact = 'max-[379px]:px-3 max-[379px]:text-xs'

/** Two separate buttons, both always rendered side by side: [ Monthly ] [ Yearly · Save 20% ]. */
export function BillingToggle({ label, monthlyLabel, yearlyLabel, savingsLabel }: BillingToggleProps) {
  const { isYearly, setIsYearly } = useContext(BillingContext)

  return (
    // The wrapper centres; the pill is an inline-flex item, so it hugs the buttons in every
    // browser (w-fit alone relies on width: fit-content, which older Safari ignores).
    <div className="my-6 flex w-full items-center justify-center">
      <div
        role="group"
        aria-label={label}
        className="inline-flex w-fit items-center gap-1 rounded-full border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800"
      >
        <button
          type="button"
          aria-pressed={!isYearly}
          onClick={() => setIsYearly(false)}
          className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${focus} ${compact} ${
            !isYearly ? active : inactive
          }`}
        >
          {monthlyLabel}
        </button>

        <button
          type="button"
          aria-pressed={isYearly}
          onClick={() => setIsYearly(true)}
          className={`flex flex-row items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors max-[379px]:gap-1.5 ${focus} ${compact} ${
            isYearly ? active : inactive
          }`}
        >
          {yearlyLabel}{' '}
          {savingsLabel && (
            // Inside the Yearly button, right next to its text. amber-800 on light amber is 5.7:1.
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-800 max-[379px]:px-1.5 max-[379px]:text-[0.6875rem]">
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
  const { isYearly } = useContext(BillingContext)
  const showYearly = isYearly && Boolean(yearly)
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
      {/* The annual total exists only in Yearly mode; its line height stays reserved so the cards don't jump. */}
      {yearly && yearlyNote && (
        <div className="mt-1 min-h-4">
          {showYearly && (
            <p className={`text-xs motion-safe:animate-price-in ${dark ? 'text-brand-soft' : 'text-brand-ink'}`}>
              {yearlyNote}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
