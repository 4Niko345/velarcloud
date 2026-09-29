import {
  siFacebook,
  siGmail,
  siGoogle,
  siGooglecalendar,
  siGooglemeet,
  siInstagram,
  siMessenger,
  siPaypal,
  siQuickbooks,
  siShopify,
  siStripe,
  siTiktok,
  siWhatsapp,
  siWordpress,
  siX,
  siYoutube,
  siZoom,
  type SimpleIcon,
} from 'simple-icons'
import { brandOptions, type BrandKey } from '@/payload/fields/brands'

const marks: Record<BrandKey, SimpleIcon> = {
  google: siGoogle,
  googlecalendar: siGooglecalendar,
  googlemeet: siGooglemeet,
  gmail: siGmail,
  facebook: siFacebook,
  messenger: siMessenger,
  instagram: siInstagram,
  whatsapp: siWhatsapp,
  tiktok: siTiktok,
  youtube: siYoutube,
  x: siX,
  stripe: siStripe,
  paypal: siPaypal,
  shopify: siShopify,
  wordpress: siWordpress,
  zoom: siZoom,
  quickbooks: siQuickbooks,
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

/** "Google", "WordPress", "Quick Books" → brand key, or null if there is no built-in logo. */
export function brandFromName(name: string): BrandKey | null {
  const key = normalize(name)
  return brandOptions.find((brand) => brand.value === key || normalize(brand.label) === key)?.value ?? null
}

// Longest names first so "Google Calendar" wins over "Google". Names of 5+
// letters may take Finnish endings ("Googlen", "WhatsApp-integraatio"); shorter
// ones must stand alone ("Zoom", not "zoomata"); one-letter "X" is never matched.
const escape = (label: string) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const mentionPattern = new RegExp(
  `\\b(${[...brandOptions]
    .map((brand) => brand.label)
    .filter((label) => label.length >= 3)
    .sort((a, b) => b.length - a.length)
    .map((label) => (label.length >= 5 ? escape(label) : `${escape(label)}\\b`))
    .join('|')})`,
  'i',
)

/** First brand named in a piece of text, e.g. "WhatsApp-integraatio" → "whatsapp". */
export function brandMentionedIn(text: string): BrandKey | null {
  const match = text.match(mentionPattern)
  return match ? brandFromName(match[1]) : null
}

// Marks drawn as a wide wordmark inside the square viewBox; shown wider so they
// don't look smaller than the others.
const wordmarks: Partial<Record<BrandKey, number>> = { zoom: 2.4 }

type BrandLogoProps = {
  brand: BrandKey
  /** Height in px (wordmarks get proportionally wider). */
  size?: number
  className?: string
  /** Decorative next to visible text: hide from screen readers. */
  decorative?: boolean
}

/** Single-colour brand mark (inherits currentColor so it follows the theme). */
export function BrandLogo({ brand, size = 20, className = '', decorative = false }: BrandLogoProps) {
  const mark = marks[brand]
  const widthFactor = wordmarks[brand] ?? 1
  // Crop a wordmark's viewBox to its middle band so the letters fill the height.
  const viewBox = widthFactor > 1 ? `0 ${12 - 12 / widthFactor} 24 ${24 / widthFactor}` : '0 0 24 24'
  return (
    <svg
      viewBox={viewBox}
      width={size * widthFactor}
      height={size}
      fill="currentColor"
      className={`shrink-0 ${className}`}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': mark.title })}
    >
      {!decorative && <title>{mark.title}</title>}
      <path d={mark.path} />
    </svg>
  )
}
