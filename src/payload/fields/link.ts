import type { ArrayField, Field } from 'payload'

type LinkFieldOptions = {
  /** Show the Primary/Secondary choice (buttons). Off for plain text links. */
  appearance?: boolean
  /** Require a label. Off where the link is optional (e.g. the announcement bar). */
  required?: boolean
}

/**
 * A call-to-action link. "Free trial" and "Book a call" resolve to the URLs in
 * Site settings, so a new signup or booking address is changed in one place.
 */
export const linkFields = ({ appearance = true, required = true }: LinkFieldOptions = {}): Field[] => [
  {
    type: 'row',
    fields: [
      { name: 'label', type: 'text', required, localized: true },
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
      ...(appearance
        ? [
            {
              name: 'appearance',
              type: 'select',
              required: true,
              defaultValue: 'primary',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
              ],
            } satisfies Field,
          ]
        : []),
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
  fields: linkFields(),
})
