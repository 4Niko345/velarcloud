// Brands with a built-in logo (drawn by src/components/brands/BrandLogo.tsx
// from the simple-icons package). Slack, Twilio, OpenAI and LinkedIn asked
// simple-icons to remove their marks, so they need an uploaded logo instead.
export const brandOptions = [
  { label: 'Google', value: 'google' },
  { label: 'Google Calendar', value: 'googlecalendar' },
  { label: 'Google Meet', value: 'googlemeet' },
  { label: 'Gmail', value: 'gmail' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Messenger', value: 'messenger' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'X', value: 'x' },
  { label: 'Stripe', value: 'stripe' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Shopify', value: 'shopify' },
  { label: 'WordPress', value: 'wordpress' },
  { label: 'Zoom', value: 'zoom' },
  { label: 'QuickBooks', value: 'quickbooks' },
] as const

export type BrandKey = (typeof brandOptions)[number]['value']
