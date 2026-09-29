import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'

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
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
  ],
}
