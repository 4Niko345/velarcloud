import type { TextField } from 'payload'

/** Section id for in-page menu links: "pricing" makes the section reachable at #pricing. */
export const anchorField: TextField = {
  name: 'anchor',
  type: 'text',
  admin: {
    description: 'Optional id for menu links, e.g. "pricing" → #pricing. Same in every language.',
  },
  validate: (value: null | string | undefined) =>
    !value || /^[a-z0-9-]+$/.test(value) || 'Use lowercase letters, numbers and dashes only.',
}

/** Small heading text shown above a section title. */
export const eyebrowField: TextField = { name: 'eyebrow', type: 'text', localized: true }
