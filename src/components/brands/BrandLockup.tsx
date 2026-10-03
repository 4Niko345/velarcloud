import { siInstagram, siZoom, type SimpleIcon } from 'simple-icons'
import { brandIcons, brandFromName } from './BrandLogo'

// Full-colour brand logos for the integrations row: the brand's symbol in its own
// colours with the name beside it. Symbols come from simple-icons (official paths and
// colours); the names are set in the site's display font.

/** Instagram's gradient, defined once per page by <BrandLockupDefs />. */
const instagramGradient = 'velar-instagram-gradient'

/**
 * Shared SVG definitions for the logos. Render once, outside anything that can be
 * display:none (a gradient defined there would not paint).
 */
export function BrandLockupDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        {/* Instagram's yellow → orange → pink → purple glow from the lower left. */}
        <radialGradient id={instagramGradient} cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285aeb" />
        </radialGradient>
      </defs>
    </svg>
  )
}

const markClass = 'size-7 shrink-0 sm:size-8'

/** A simple-icons symbol in its brand colour (or another fill, e.g. a gradient). */
function SimpleMark({ icon, fill = `#${icon.hex}` }: { icon: SimpleIcon; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={markClass}>
      <path d={icon.path} fill={fill} />
    </svg>
  )
}

/** Google's four-colour "G". */
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={markClass}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

/** Zoom's logo is the blue "zoom" wordmark itself, so it is shown without a name. */
function ZoomWordmark() {
  return (
    <svg viewBox="0 7 24 10" role="img" aria-label="Zoom" className="h-7 w-auto shrink-0 sm:h-8">
      <path d={siZoom.path} fill={`#${siZoom.hex}`} />
    </svg>
  )
}

/**
 * Colour of the name, matching each brand's own wordmark. Brands not listed use the
 * site's near-black text. Slack, Twilio and OpenAI have no symbol in simple-icons
 * (removed at the brands' request), so they appear as their name only; upload the
 * official logo in the admin to show it instead.
 */
const nameColors: Record<string, string> = {
  google: '#5f6368',
  facebook: '#0866ff',
  paypal: '#002991',
  stripe: '#635bff',
  slack: '#4a154b',
  twilio: '#f22f46',
  openai: '#000000',
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

/** "Google" → four-colour G + "Google"; unknown names → the name as text. */
export function BrandLockup({ name }: { name: string }) {
  const brand = brandFromName(name)
  if (brand === 'zoom') return <ZoomWordmark />

  const mark =
    brand === 'google' ? (
      <GoogleG />
    ) : brand === 'instagram' ? (
      <SimpleMark icon={siInstagram} fill={`url(#${instagramGradient})`} />
    ) : brand ? (
      <SimpleMark icon={brandIcons[brand]} />
    ) : null

  return (
    <span className="flex items-center gap-2.5">
      {mark}
      <span
        className="whitespace-nowrap font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        style={{ color: nameColors[normalize(name)] }}
      >
        {name}
      </span>
    </span>
  )
}
