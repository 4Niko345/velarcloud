import type { Locale } from '@/i18n/config'

/**
 * Twelve times the amount in a price label, keeping its currency and position:
 * "$77" → "$924", "$237" → "$2,844" (en) / "$2 844" (fi), "77,50 €" → "930 €".
 * Null when the label has no number.
 */
export function yearlyTotal(monthly: string, locale: Locale): string | null {
  const raw = monthly.match(/\d[\d\s.,]*/)?.[0].trim()
  if (!raw) return null
  const value =
    Number(
      raw
        .replace(/\s/g, '')
        .replace(/[.,](?=\d{3}(?!\d))/g, '') // thousands separators
        .replace(',', '.'), // decimal comma
    ) * 12
  if (!Number.isFinite(value)) return null
  const formatted = new Intl.NumberFormat(locale === 'fi' ? 'fi-FI' : 'en-US', {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)
  return monthly.replace(raw, formatted)
}
