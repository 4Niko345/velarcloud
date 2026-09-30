import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'

// Customer quotes. Invented reviews are banned in the EU (Directive 2019/2161)
// and under the Finnish Consumer Protection Act, so nothing is seeded here: the
// section renders only once real quotes are added in the admin.
export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    anchorField,
    eyebrowField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    {
      name: 'items',
      type: 'array',
      maxRows: 6,
      admin: {
        description:
          'Only genuine feedback from real customers, published with their permission. The section is hidden while this list is empty.',
      },
      fields: [
        { name: 'quote', type: 'textarea', required: true, localized: true },
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true },
            {
              name: 'role',
              type: 'text',
              localized: true,
              admin: { description: 'Title and company, e.g. "Toimitusjohtaja, Yritys Oy".' },
            },
            {
              name: 'rating',
              type: 'number',
              min: 1,
              max: 5,
              admin: { description: 'The customer’s own star rating (1–5). Leave empty to hide stars.' },
            },
          ],
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional photo (with permission). Without one, initials are shown.' },
        },
      ],
    },
  ],
}
