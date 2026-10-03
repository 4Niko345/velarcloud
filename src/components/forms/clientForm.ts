import type { Form } from '@/payload/payload-types'

export type ClientFormField = {
  id: string
  blockType: NonNullable<Form['fields']>[number]['blockType']
  name: string
  label: string
  required: boolean
  /** Share of the row from sm up, in percent. Phones always get the full width. */
  width: number
  defaultValue: string | boolean
  options: { label: string; value: string }[]
  placeholder: string
}

export type ClientForm = {
  id: number
  fields: ClientFormField[]
  submitLabel: string | null
  redirectUrl: string | null
}

/**
 * The parts of a form the browser needs. Leaves out the notification emails
 * (addresses) and the rich text, which the server renders.
 */
export function toClientForm(form: Form): ClientForm {
  return {
    id: form.id,
    submitLabel: form.submitButtonLabel || null,
    redirectUrl: form.confirmationType === 'redirect' ? form.redirect?.url || null : null,
    fields: (form.fields ?? []).map((field, index) => {
      const id = field.id ?? `field-${index}`
      if (field.blockType === 'message') {
        return { id, blockType: 'message', name: '', label: '', required: false, width: 100, defaultValue: '', options: [], placeholder: '' }
      }
      return {
        id,
        blockType: field.blockType,
        name: field.name,
        label: field.label || field.name,
        required: Boolean(field.required),
        width: Math.min(100, Math.max(10, field.width || 100)),
        defaultValue:
          field.blockType === 'checkbox'
            ? Boolean(field.defaultValue)
            : 'defaultValue' in field && field.defaultValue != null
              ? String(field.defaultValue)
              : '',
        options: field.blockType === 'select' ? (field.options ?? []).map(({ label, value }) => ({ label, value })) : [],
        placeholder: field.blockType === 'select' ? field.placeholder || '' : '',
      }
    }),
  }
}
