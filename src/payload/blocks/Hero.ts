import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'
import { iconField } from '../fields/icon'
import { linksField } from '../fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    anchorField,
    eyebrowField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    linksField(),
    {
      name: 'trustItems',
      label: 'Trust line',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Small reassurance right under the buttons, e.g. "Ei sitoutumista", "Peru milloin vain".',
      },
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    {
      name: 'highlights',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Short points with an icon under the buttons.' },
      fields: [
        {
          type: 'row',
          fields: [
            iconField({ defaultValue: 'check' }),
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional product screenshot. Without one, an illustration is shown.' },
    },
  ],
}
