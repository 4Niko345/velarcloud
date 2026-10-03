import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { APIError, type CollectionAfterChangeHook, type CollectionBeforeValidateHook, type Field } from 'payload'
import type { Form, FormSubmission } from './payload-types'
import { isEmail } from '../lib/email'
import { cleanName, getEmailTemplate, renderEmail } from './email/templates'

// Forms editable in the admin (Forms), their submissions (Form submissions) and the
// emails they send. Built on the official form builder plugin.

const group = 'Forms & email'

const maxLength = 5000

type InputField = Exclude<NonNullable<Form['fields']>[number], { blockType: 'message' }>

const inputFields = (form: Form): InputField[] =>
  (form.fields ?? []).filter((field): field is InputField => field.blockType !== 'message')

/**
 * Checks a submission against its form before it is saved: only the form's own
 * fields, required ones filled, emails and choices valid. The public API accepts
 * anything otherwise, and the emails rely on these values.
 */
const validateSubmission: CollectionBeforeValidateHook<FormSubmission> = async ({ data, operation, req }) => {
  if (operation !== 'create' || !data) return data

  const fail = (message: string): never => {
    throw new APIError(message, 400, undefined, true)
  }

  const formId = typeof data.form === 'object' && data.form ? data.form.id : data.form
  if (!formId) fail('Missing form.')
  const form = await req.payload
    .findByID({ collection: 'forms', id: formId as number, depth: 0, req })
    .catch(() => null)
  if (!form) return fail('This form does not exist.')

  const fields = inputFields(form)
  const entries = Array.isArray(data.submissionData) ? data.submissionData : []
  const values = new Map<string, string>()
  for (const entry of entries) {
    const name = String(entry?.field ?? '')
    if (!fields.some((field) => field.name === name)) fail(`Unknown field "${name}".`)
    if (values.has(name)) fail(`Field "${name}" was sent twice.`)
    values.set(name, String(entry?.value ?? '').trim())
  }

  for (const field of fields) {
    const value = values.get(field.name) ?? ''
    const label = field.label || field.name
    const empty = field.blockType === 'checkbox' ? value !== 'true' : value === ''
    if (field.required && empty) fail(`${label}: required.`)
    if (value.length > maxLength) fail(`${label}: too long.`)
    if (!value) continue
    if (field.blockType === 'email' && !isEmail(value)) fail(`${label}: invalid email address.`)
    if (field.blockType === 'number' && !Number.isFinite(Number(value))) fail(`${label}: not a number.`)
    if (field.blockType === 'checkbox' && value !== 'true' && value !== 'false') fail(`${label}: invalid value.`)
    if (field.blockType === 'select' && !(field.options ?? []).some((option) => option.value === value)) {
      fail(`${label}: invalid choice.`)
    }
  }

  // Store answers in the form's field order, trimmed.
  data.submissionData = fields
    .filter((field) => values.has(field.name))
    .map((field) => ({ field: field.name, value: values.get(field.name) as string }))
  return data
}

/** "Thank you for contacting us" (Email templates) to the address the visitor entered. */
const sendThankYou: CollectionAfterChangeHook<FormSubmission> = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  try {
    const formId = typeof doc.form === 'object' ? doc.form.id : doc.form
    const form = await req.payload.findByID({ collection: 'forms', id: formId, depth: 0, req })
    if (!form.sendThankYou) return doc

    const answers = new Map((doc.submissionData ?? []).map(({ field, value }) => [field, value]))
    const emailField = inputFields(form).find((field) => field.blockType === 'email')
    const to = emailField ? answers.get(emailField.name) : undefined
    if (!to || !isEmail(to)) return doc

    const { template, locale } = await getEmailTemplate(req.payload, 'contactThankYou', req.locale)
    const email = renderEmail(template, { name: cleanName(answers.get('name') ?? '') }, locale)
    await req.payload.sendEmail({ to, subject: email.subject, html: email.html, text: email.text })
  } catch (err) {
    req.payload.logger.error({ err, msg: `Thank-you email for form submission ${doc.id} was not sent.` })
  }
  return doc
}

export const formsPlugin = formBuilderPlugin({
  fields: {
    text: true,
    email: true,
    textarea: true,
    number: true,
    select: true,
    checkbox: true,
    message: true,
    // US states/countries, payments and file uploads aren't used.
    state: false,
    country: false,
    payment: false,
    upload: false,
  },
  // An empty "Email from" would replace the default sender with nothing; drop empty values.
  beforeEmail: (emails) =>
    emails.map(
      (email) =>
        Object.fromEntries(Object.entries(email).filter(([, value]) => value !== undefined && value !== '')) as typeof email,
    ),
  formOverrides: {
    labels: { singular: 'Form', plural: 'Forms' },
    admin: {
      group,
      description:
        'Forms shown on the site, e.g. the contact form. Add a form to a page with the Contact section. Labels and messages are per language.',
      defaultColumns: ['title', 'updatedAt'],
    },
    fields: ({ defaultFields }) => [
      ...defaultFields.map((field): Field =>
        field.type === 'array' && field.name === 'emails'
          ? {
              ...field,
              label: 'Notification emails',
              admin: {
                ...field.admin,
                description:
                  'Emails to your team when the form is submitted. Use the field names in double braces for the answers, e.g. {{name}} or {{email}}, or {{*:table}} for all of them. Set "Reply to" to {{email}} to answer the visitor directly. The thank-you email to the visitor is edited in Email templates.',
              },
            }
          : field,
      ),
      {
        name: 'sendThankYou',
        label: 'Send thank-you email',
        type: 'checkbox',
        defaultValue: true,
        admin: {
          position: 'sidebar',
          description:
            'Sends "Thank you for contacting us" (Email templates) to the address the visitor typed in the Email field.',
        },
      },
    ],
  },
  formSubmissionOverrides: {
    labels: { singular: 'Form submission', plural: 'Form submissions' },
    admin: {
      group,
      description: 'Messages sent with the forms on the site. Only logged-in users can see them.',
      defaultColumns: ['form', 'createdAt'],
    },
    hooks: {
      beforeValidate: [validateSubmission],
      afterChange: [sendThankYou],
    },
  },
})
