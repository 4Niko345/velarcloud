import Image from 'next/image'
import { Mail } from 'lucide-react'
import { resolveLink } from '@/lib/links'
import type { ContactBlock } from '@/payload/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { container, SectionHeader, type SectionContext } from './shared'
import { mediaSrc } from '@/lib/media'

/**
 * Text, buttons and email on the left; the embedded GoHighLevel form on the
 * right. Until a form URL is set in the admin, the image takes the form's place.
 */
export function Contact({ block, ctx }: { block: ContactBlock; ctx: SectionContext }) {
  const headingId = `${block.id}-heading`
  const image = typeof block.image === 'object' ? block.image : null
  const email = block.showEmail ? ctx.settings.contactEmail : null
  const formUrl = block.formUrl

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

          {formUrl && photo && <div className="mt-10 hidden lg:block">{photo}</div>}
        </div>

        {formUrl ? (
          <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm sm:p-4">
            <iframe
              src={formUrl}
              title={block.formTitle || block.heading}
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
