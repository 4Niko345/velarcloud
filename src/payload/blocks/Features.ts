import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'
import { brandOptions } from '../fields/brands'
import { iconField } from '../fields/icon'

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
            iconField({ required: true, defaultValue: 'crm' }),
            { name: 'title', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'text', type: 'textarea', localized: true },
        {
          name: 'brands',
          type: 'select',
          hasMany: true,
          options: [...brandOptions],
          admin: { description: 'Optional small logos under the text, e.g. the services this works with.' },
        },
      ],
    },
  ],
}
