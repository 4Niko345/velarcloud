import type { Block } from 'payload'
import { anchorField, eyebrowField } from '../fields/anchor'
import { linksField } from '../fields/link'

export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: { singular: 'Contact form', plural: 'Contact forms' },
  fields: [
    anchorField,
    eyebrowField,
    { name: 'heading', type: 'text', required: true, localized: true },
    { name: 'text', type: 'textarea', localized: true },
    linksField(),
    {
      name: 'showEmail',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Show the contact email from Site settings.' },
    },
    {
      name: 'formUrl',
      label: 'Form embed URL',
      type: 'text',
      localized: true,
      admin: {
        description:
          'GoHighLevel form embed URL, e.g. https://api.leadconnectorhq.com/widget/form/… (GoHighLevel → Sites → Forms → Integrate). Until it is set, the image is shown instead.',
      },
      validate: (value: null | string | undefined) =>
        !value || /^https:\/\/\S+$/.test(value) || 'Use a full https:// address.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'formTitle',
          type: 'text',
          localized: true,
          admin: { description: 'Name of the form for screen readers, e.g. "Yhteydenottolomake".' },
        },
        {
          name: 'formHeight',
          type: 'number',
          defaultValue: 760,
          min: 300,
          max: 2000,
          admin: { description: 'Height of the embedded form in pixels.' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Shown beside the text, or in place of the form until it is set.' },
    },
  ],
}
