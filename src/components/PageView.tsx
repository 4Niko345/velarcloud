import Image from 'next/image'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getSiteSettings } from '@/lib/settings'
import type { Page } from '@/payload/payload-types'
import { PageHeader } from './PageHeader'
import { RichTextContent } from './RichTextContent'
import { RenderSections } from './sections/RenderSections'
import { mediaSrc } from '@/lib/media'

/** A page built from sections, or a simple title + rich text page (e.g. privacy policy). */
export async function PageView({ page, locale }: { page: Page; locale: Locale }) {
  if (page.layout?.length) {
    const settings = await getSiteSettings(locale)
    return <RenderSections sections={page.layout} ctx={{ locale, settings, dict: getDictionary(locale) }} />
  }

  const hero = typeof page.heroImage === 'object' ? page.heroImage : null

  return (
    <article>
      <PageHeader title={page.title} intro={page.description} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {hero?.url && (
          <Image
            src={mediaSrc(hero.url)}
            alt={hero.alt}
            width={hero.width ?? 1920}
            height={hero.height ?? 1080}
            sizes="(min-width: 768px) 768px, 100vw"
            className="mb-10 h-auto w-full rounded-2xl border border-border"
            priority
          />
        )}
        {page.content && <RichTextContent data={page.content} />}
      </div>
    </article>
  )
}
