import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'
import { iconField } from '../fields/icon'
import { linkFields } from '../fields/link'

// Checklist groups; headings and icons live in src/components/sections/Pricing.tsx.
export const featureCategories = [
  { label: 'CRM & sales', value: 'crm' },
  { label: 'Automation', value: 'automation' },
  { label: 'Websites & content', value: 'website' },
  { label: 'Marketing & channels', value: 'marketing' },
  { label: 'Onboarding & support', value: 'support' },
] as const

export const PricingBlock: Block = {
  slug: 'pricing',
  interfaceName: 'PricingBlock',
  labels: { singular: 'Pricing', plural: 'Pricing' },
  fields: [
    anchorField,
    eyebrowField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'billing',
      label: 'Monthly / yearly switch',
      type: 'group',
      admin: {
        description:
          'The switch appears when a plan has a yearly price. Make sure checkout offers yearly billing first.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'monthlyLabel', type: 'text', localized: true, admin: { placeholder: 'Kuukausittain' } },
            { name: 'yearlyLabel', type: 'text', localized: true, admin: { placeholder: 'Vuosittain' } },
            { name: 'savingsLabel', type: 'text', localized: true, admin: { placeholder: 'Säästä 20%' } },
          ],
        },
        {
          name: 'yearlyNote',
          type: 'text',
          localized: true,
          admin: {
            description: 'Under yearly prices. {total} = 12 × the yearly price, e.g. "Laskutetaan vuosittain {total}/v".',
          },
        },
      ],
    },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, localized: true },
            {
              name: 'price',
              type: 'text',
              required: true,
              admin: { description: 'Monthly price as shown, e.g. "$97".' },
            },
            {
              name: 'yearlyPrice',
              type: 'text',
              admin: { description: 'Optional monthly price when billed yearly, e.g. "$77".' },
            },
            {
              name: 'period',
              type: 'text',
              localized: true,
              admin: { description: 'Optional, e.g. "/ kk" or "/ month".' },
            },
          ],
        },
        { name: 'description', type: 'textarea', localized: true },
        {
          type: 'row',
          fields: [
            iconField({ admin: { description: 'Optional, shown next to the plan name.' } }),
            {
              name: 'highlighted',
              type: 'checkbox',
              admin: { description: 'Emphasize this plan.' },
            },
            {
              name: 'badge',
              type: 'text',
              localized: true,
              admin: { description: 'Optional label on the card, e.g. "Suosituin".' },
            },
          ],
        },
        {
          name: 'featuresHeading',
          type: 'text',
          localized: true,
          admin: { description: 'e.g. "Everything in Basic, plus:"' },
        },
        {
          name: 'features',
          type: 'array',
          admin: { description: 'Items with a category are listed under that heading.' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  type: 'select',
                  options: [...featureCategories],
                },
                { name: 'text', type: 'text', required: true, localized: true },
              ],
            },
          ],
        },
        { name: 'link', type: 'group', fields: linkFields() },
      ],
    },
    {
      name: 'note',
      type: 'textarea',
      localized: true,
      admin: { description: 'Small print under the plans, e.g. taxes or billing period.' },
    },
  ],
}
