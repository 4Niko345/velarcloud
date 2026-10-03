import type { Field, GlobalConfig } from 'payload'
import { defaultLocale, hasLocale } from '../../i18n/config'
import { authenticated } from '../access'
import { defaultTemplates, type EmailTemplate, type TemplateKey } from '../email/templates'

const bodyHelp =
  'Plain text. Leave an empty line between paragraphs. Placeholders are replaced when the email is sent:'

/** Subject, heading, body (and button) for one email, prefilled with the default texts of each language. */
function templateFields(key: TemplateKey, placeholders: string, withButton = false): Field[] {
  const initial =
    (field: keyof EmailTemplate) =>
    ({ locale }: { locale?: string }) =>
      defaultTemplates[key][locale && hasLocale(locale) ? locale : defaultLocale][field]

  return [
    { name: 'subject', type: 'text', required: true, localized: true, defaultValue: initial('subject') },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      defaultValue: initial('heading'),
      admin: { description: 'Large title at the top of the email.' },
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: initial('body'),
      admin: { rows: 12, description: `${bodyHelp} ${placeholders}` },
    },
    ...(withButton
      ? [
          {
            name: 'buttonLabel',
            type: 'text',
            localized: true,
            defaultValue: initial('buttonLabel'),
            admin: { description: 'Text on the button. Put {{button}} on its own line in the body where it goes.' },
          } satisfies Field,
        ]
      : []),
  ]
}

export const EmailTemplates: GlobalConfig = {
  slug: 'email-templates',
  label: 'Email templates',
  admin: {
    group: 'Forms & email',
    description:
      'Texts of the automatic emails, per language (switch the language at the top). An empty field uses the default text.',
  },
  access: {
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'forgotPassword',
          label: 'Forgot password',
          description: 'Sent when someone clicks "Forgot password?" on the admin login page.',
          fields: templateFields(
            'forgotPassword',
            '{{name}} the user\'s name (or email), {{email}} their email, {{link}} the reset address, {{button}} the reset button.',
            true,
          ),
        },
        {
          name: 'contactThankYou',
          label: 'Thank you for contacting us',
          description:
            'Sent automatically to the visitor after they submit a form that has "Send thank-you email" switched on (Forms → the form → sidebar). It goes to the address they typed, so it never repeats their message.',
          fields: templateFields('contactThankYou', '{{name}} the name the visitor entered (in the form field named "name").'),
        },
      ],
    },
  ],
}
