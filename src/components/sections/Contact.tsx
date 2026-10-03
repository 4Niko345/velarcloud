import Image from 'next/image'
import { Mail } from 'lucide-react'
import { resolveLink } from '@/lib/links'
import type { ContactBlock } from '@/payload/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { FormRenderer } from '@/components/forms/FormRenderer'
import { toClientForm } from '@/components/forms/clientForm'
import { RichTextContent } from '@/components/RichTextContent'
import { container, SectionHeader, type SectionContext } from './shared'
import { mediaSrc } from '@/lib/media'

/**
 * Text, buttons and email on the left; on the right a form from the admin
 * (Forms), or else an embedded GoHighLevel form. Without either, the image.
 */
export function Contact({ block, ctx }: { block: ContactBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`
  const image = typeof block.image === 'object' ? block.image : null
  const email = block.showEmail ? ctx.settings.contactEmail : null
  const form = typeof block.form === 'object' ? block.form : null
  const formUrl = form ? null : block.formUrl
  const formTitle = block.formTitle || block.heading

  const photo = image?.url ? (
    <Image
      src={mediaSrc(image.url)}
      alt={image.alt}
      width={image.width ?? 1024}
      height={image.height ?? 576}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="h-auto w-full rounded-2xl border border-border shadow-sm"
    />
  ) : null

  return (
    <section id={block.anchor || undefined} aria-labelledby={headingId} className="bg-surface py-16 sm:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14`}>
        <div>
          <SectionHeader
            id={headingId}
            eyebrow={block.eyebrow}
            heading={block.heading}
            text={block.text}
            align="left"
            as={ctx.headingLevel}
          />

          {block.links && block.links.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {block.links.map((link) => {
                const href = resolveLink(link, ctx.settings, ctx.locale)
                return (
                  href && (
                    <ButtonLink key={link.id ?? href} href={href} appearance={link.appearance}>
                      {link.label}
                    </ButtonLink>
                  )
                )
              })}
            </div>
          )}

          {email && (
            <p className="mt-6 flex items-center gap-2 text-muted">
              <Mail className="size-4 text-brand-ink" aria-hidden />
              <a
                href={`mailto:${email}`}
                className="rounded font-medium text-foreground underline decoration-brand/40 underline-offset-4 hover:text-brand-ink hover:decoration-brand-ink focus-visible:outline-2 focus-visible:outline-brand-ink"
              >
                {email}
              </a>
            </p>
          )}

          {(form || formUrl) && photo && <div className="mt-10 hidden lg:block">{photo}</div>}
        </div>

        {form ? (
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8">
            <FormRenderer
              form={toClientForm(form)}
              locale={ctx.locale}
              labels={ctx.dict.form}
              title={formTitle}
              messages={Object.fromEntries(
                (form.fields ?? []).flatMap((field) =>
                  field.blockType === 'message' && field.message && field.id
                    ? [[field.id, <RichTextContent key={field.id} data={field.message} />]]
                    : [],
                ),
              )}
              confirmation={form.confirmationMessage ? <RichTextContent data={form.confirmationMessage} /> : null}
            />
          </div>
        ) : formUrl ? (
          <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm sm:p-4">
            <iframe
              src={formUrl}
              title={formTitle}
              loading="lazy"
              className="w-full border-0"
              style={{ height: block.formHeight ?? 760 }}
            />
          </div>
        ) : (
          photo
        )}
      </div>
    </section>
  )
}
