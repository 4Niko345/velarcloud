'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { ctaHover } from '@/components/ui/ButtonLink'
import { isEmail } from '@/lib/email'
import type { ClientForm, ClientFormField } from './clientForm'

type Labels = Dictionary['form']
type Values = Record<string, string | boolean>

/** Bots fill every input; people never see this one. */
const honeypotName = 'url_confirm'

const autoComplete: Record<string, string> = { name: 'name', email: 'email', phone: 'tel', company: 'organization' }

const control =
  'mt-1.5 block w-full rounded-xl border border-border bg-white px-4 py-3 text-base text-foreground shadow-xs transition-colors placeholder:text-muted hover:border-foreground/30 focus:border-brand-ink focus:outline-none focus:ring-3 focus:ring-brand/25 aria-invalid:border-red-600 aria-invalid:focus:ring-red-600/20'

function validate(field: ClientFormField, value: string | boolean | undefined, labels: Labels): string | null {
  if (field.blockType === 'checkbox') return field.required && value !== true ? labels.requiredCheckbox : null
  const text = String(value ?? '').trim()
  if (!text) return field.required ? labels.required : null
  if (field.blockType === 'email' && !isEmail(text)) return labels.invalidEmail
  if (field.blockType === 'number' && !Number.isFinite(Number(text))) return labels.invalidNumber
  return null
}

type FormRendererProps = {
  form: ClientForm
  locale: Locale
  labels: Labels
  /** Accessible name of the form. */
  title: string
  /** Rich text of the form's message blocks, rendered on the server, by block id. */
  messages: Record<string, ReactNode>
  /** The form's confirmation message, rendered on the server. */
  confirmation: ReactNode
}

/** A form from the admin (Forms). Sends to Payload's form submissions API. */
export function FormRenderer({ form, locale, labels, title, messages, confirmation }: FormRendererProps) {
  const inputs = form.fields.filter((field) => field.blockType !== 'message')
  const [values, setValues] = useState<Values>(() =>
    Object.fromEntries(inputs.map((field) => [field.name, field.defaultValue])),
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const doneRef = useRef<HTMLDivElement>(null)
  const prefix = useId()
  const idFor = (field: ClientFormField) => `${prefix}-${field.name}`

  useEffect(() => {
    if (status === 'sent') doneRef.current?.focus()
  }, [status])

  const update = (name: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current }
        delete next[name]
        return next
      })
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    if (new FormData(event.currentTarget).get(honeypotName)) {
      setStatus('sent')
      return
    }

    const found: Record<string, string> = {}
    for (const field of inputs) {
      const error = validate(field, values[field.name], labels)
      if (error) found[field.name] = error
    }
    setErrors(found)
    const firstInvalid = inputs.find((field) => found[field.name])
    if (firstInvalid) {
      document.getElementById(idFor(firstInvalid))?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`/api/form-submissions?locale=${locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: form.id,
          submissionData: inputs
            .map((field) => ({ field: field.name, value: String(values[field.name] ?? '').trim() }))
            .filter((entry) => entry.value !== ''),
        }),
      })
      if (!response.ok) throw new Error(`Form submission failed (${response.status}).`)
      if (form.redirectUrl) {
        window.location.assign(form.redirectUrl)
        return
      }
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-4 focus:outline-none">
        <CircleCheck className="size-10 text-emerald-600" strokeWidth={1.75} aria-hidden />
        {confirmation ?? <p className="text-lg font-medium">{labels.sent}</p>}
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form noValidate aria-label={title} onSubmit={onSubmit} className="relative">
      {inputs.some((field) => field.required) && <p className="mb-5 text-sm text-muted">{labels.requiredNote}</p>}

      <div className="flex flex-wrap gap-x-4 gap-y-5">
        {form.fields.map((field) => {
          // Fields side by side from sm up: basis = width% minus its share of the 1rem gaps.
          const style = { '--field-basis': `calc(${field.width}% - ${(1 - field.width / 100).toFixed(3)}rem)` } as CSSProperties
          const wrapper = 'min-w-0 basis-full sm:basis-[var(--field-basis)]'

          if (field.blockType === 'message') {
            return (
              <div key={field.id} className="basis-full">
                {messages[field.id]}
              </div>
            )
          }

          const id = idFor(field)
          const error = errors[field.name]
          const errorId = `${id}-error`
          const common = {
            id,
            name: field.name,
            required: field.required,
            'aria-invalid': error ? true : undefined,
            'aria-describedby': error ? errorId : undefined,
            disabled: sending,
          }
          const label = (
            <>
              {field.label}
              {field.required && (
                <span aria-hidden className="ml-0.5 text-brand-ink">
                  *
                </span>
              )}
            </>
          )
          const message = error && (
            <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-700">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {error}
            </p>
          )

          if (field.blockType === 'checkbox') {
            return (
              <div key={field.id} className={wrapper} style={style}>
                <div className="flex items-start gap-3">
                  <input
                    {...common}
                    type="checkbox"
                    checked={values[field.name] === true}
                    onChange={(event) => update(field.name, event.target.checked)}
                    className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand-ink"
                  />
                  <label htmlFor={id} className="cursor-pointer text-base leading-snug text-foreground">
                    {label}
                  </label>
                </div>
                {message}
              </div>
            )
          }

          const value = String(values[field.name] ?? '')
          return (
            <div key={field.id} className={wrapper} style={style}>
              <label htmlFor={id} className="text-sm font-medium text-foreground">
                {label}
              </label>
              {field.blockType === 'textarea' ? (
                <textarea
                  {...common}
                  rows={5}
                  value={value}
                  onChange={(event) => update(field.name, event.target.value)}
                  className={`${control} min-h-32 resize-y`}
                />
              ) : field.blockType === 'select' ? (
                <div className="relative">
                  <select
                    {...common}
                    value={value}
                    onChange={(event) => update(field.name, event.target.value)}
                    className={`${control} cursor-pointer appearance-none pr-11`}
                  >
                    <option value="">{field.placeholder || labels.choose}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-4 top-1/2 mt-0.75 size-5 -translate-y-1/2 text-muted"
                    aria-hidden
                  />
                </div>
              ) : (
                <input
                  {...common}
                  type={field.blockType === 'email' ? 'email' : field.name === 'phone' ? 'tel' : 'text'}
                  inputMode={field.blockType === 'number' ? 'decimal' : undefined}
                  autoComplete={autoComplete[field.name]}
                  value={value}
                  onChange={(event) => update(field.name, event.target.value)}
                  className={control}
                />
              )}
              {message}
            </div>
          )
        })}
      </div>

      {/* Honeypot: hidden from people and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          {labels.honeypot}
          <input type="text" name={honeypotName} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-800">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          {labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className={`mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-7 text-base font-semibold text-white shadow-sm hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink disabled:cursor-wait disabled:opacity-80 sm:w-auto ${ctaHover}`}
      >
        {sending && <LoaderCircle className="size-5 animate-spin" aria-hidden />}
        {sending ? labels.sending : form.submitLabel || labels.submit}
      </button>
    </form>
  )
}
