import type { Block } from 'payload'
import { anchorField } from '../fields/anchor'
import { linksField } from '../fields/link'

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    anchorField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    linksField(),
    {
      name: 'showEmail',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the contact email from Site settings.' },
    },
  ],
}
