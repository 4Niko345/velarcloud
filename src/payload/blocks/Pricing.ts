import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'
import { linkFields } from '../fields/link'

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
              admin: { description: 'As shown, e.g. "$97" or "97 €".' },
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
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        { name: 'link', type: 'group', fields: linkFields },
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
