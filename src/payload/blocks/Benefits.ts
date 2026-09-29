import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'
import { iconField } from '../fields/icon'

export const BenefitsBlock: Block = {
  slug: 'benefits',
  interfaceName: 'BenefitsBlock',
  labels: { singular: 'Benefits', plural: 'Benefits' },
  fields: [
    anchorField,
    eyebrowField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            iconField({ admin: { description: 'Optional. Without one, items are numbered.' } }),
            { name: 'title', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
  ],
}
