import type { SelectField } from 'payload'

// Keys map to Lucide icons in src/components/icons.ts.
export const iconOptions = [
  { label: 'CRM / people', value: 'crm' },
  { label: 'Website', value: 'website' },
  { label: 'Automation', value: 'automation' },
  { label: 'Messages', value: 'messages' },
  { label: 'Social scheduling', value: 'social' },
  { label: 'Payments', value: 'payments' },
  { label: 'AI', value: 'ai' },
  { label: 'Reports', value: 'reports' },
  { label: 'Check', value: 'check' },
  { label: 'Gift', value: 'gift' },
  { label: 'Lightning', value: 'zap' },
  { label: 'Layers', value: 'layers' },
  { label: 'Rocket', value: 'rocket' },
  { label: 'Star', value: 'star' },
  { label: 'Crown', value: 'crown' },
  { label: 'Gem', value: 'gem' },
  { label: 'Shield', value: 'shield' },
  { label: 'Clock', value: 'clock' },
  { label: 'Wallet', value: 'wallet' },
  { label: 'Piggy bank', value: 'piggy' },
  { label: 'Growth', value: 'trending' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Support', value: 'headset' },
  { label: 'Globe', value: 'globe' },
] as const

export type IconKey = (typeof iconOptions)[number]['value']

type IconFieldOptions = {
  required?: boolean
  defaultValue?: IconKey
  admin?: SelectField['admin']
}

export const iconField = ({ required, defaultValue, admin }: IconFieldOptions = {}): SelectField => ({
  name: 'icon',
  type: 'select',
  options: [...iconOptions],
  required,
  defaultValue,
  admin,
})
