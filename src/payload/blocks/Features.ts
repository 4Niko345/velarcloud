import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'

// Keys map to icons in src/components/sections/icons.ts.
export const featureIcons = [
  { label: 'CRM / people', value: 'crm' },
  { label: 'Website', value: 'website' },
  { label: 'Automation', value: 'automation' },
  { label: 'Messages', value: 'messages' },
  { label: 'Social scheduling', value: 'social' },
  { label: 'Payments', value: 'payments' },
  { label: 'AI', value: 'ai' },
  { label: 'Reports', value: 'reports' },
]

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: { singular: 'Features', plural: 'Features' },
  fields: [
    anchorField,
    eyebrowField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'icon', type: 'select', required: true, defaultValue: 'crm', options: featureIcons },
            { name: 'title', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
  ],
}
