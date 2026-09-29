import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'

export const LogoCloudBlock: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: { singular: 'Logo row', plural: 'Logo rows' },
  fields: [
    anchorField,
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optional. Without a logo the name is shown as text.' },
            },
          ],
        },
      ],
    },
  ],
}
