import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getSiteSettings } from '@/lib/settings'
import type { Page } from '@/payload/payload-types'
import { RenderSections } from './sections/RenderSections'

/** A page built from sections, or a simple title + rich text page (e.g. privacy policy). */
export async function PageView({ page, locale }: { page: Page; locale: Locale }) {
  if (page.layout?.length) {
    const settings = await getSiteSettings(locale)
    return <RenderSections sections={page.layout} ctx={{ locale, settings, dict: getDictionary(locale) }} />
  }

  const hero = typeof page.heroImage === 'object' ? page.heroImage : null

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1>
      {page.description && <p className="mt-4 text-lg text-muted">{page.description}</p>}
      {hero?.url && (
        <Image
          src={hero.url}
          alt={hero.alt}
          width={hero.width ?? 1920}
          height={hero.height ?? 1080}
          className="mt-8 h-auto w-full rounded-lg"
          priority
        />
      )}
      {page.content && (
        <div className="mt-8 space-y-4 leading-relaxed [&_a]:text-brand [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6">
          <RichText data={page.content} />
        </div>
      )}
    </article>
  )
}
