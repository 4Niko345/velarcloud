import type { ArrayField, Field } from 'payload'

/**
 * A call-to-action link. "Free trial" and "Book a call" resolve to the URLs in
 * Site settings, so a new signup or booking address is changed in one place.
 */
export const linkFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required: true, localized: true },
      {
        name: 'kind',
        type: 'select',
        required: true,
        defaultValue: 'trial',
        options: [
          { label: 'Free trial (Site settings)', value: 'trial' },
          { label: 'Book a call (Site settings)', value: 'booking' },
          { label: 'Custom URL or #section', value: 'custom' },
        ],
      },
      {
        name: 'appearance',
        type: 'select',
        required: true,
        defaultValue: 'primary',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
        ],
      },
    ],
  },
  {
    name: 'url',
    type: 'text',
    localized: true,
    admin: {
      description: 'https://…, /page or #section',
      condition: (_, siblingData) => siblingData?.kind === 'custom',
    },
  },
]

export const linksField = (maxRows = 2): ArrayField => ({
  name: 'links',
  type: 'array',
  maxRows,
  fields: linkFields,
})
