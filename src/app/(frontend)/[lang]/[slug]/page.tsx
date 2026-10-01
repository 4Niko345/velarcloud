import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { hasLocale, localePath, type Locale } from '@/i18n/config'
import { findSlugInLocale, getLocalizedSlugs } from '@/lib/localized'
import { pageMetadata } from '@/lib/metadata'
import { getPageBySlug } from '@/lib/pages'
import { PageView } from '@/components/PageView'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string; slug: string }> }

/** { fi: 'hinnasto', en: 'pricing' } → { fi: '/hinnasto', en: '/en/pricing' } */
const pagePaths = (slugs: Partial<Record<Locale, string>>) =>
  Object.fromEntries(
    Object.entries(slugs).map(([code, slug]) => [code, localePath(code as Locale, `/${slug}`)]),
  ) as Partial<Record<Locale, string>>

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const page = await getPageBySlug(slug, lang)
  if (!page) return {}
  return pageMetadata({
    title: page.title,
    description: page.description,
    locale: lang,
    paths: pagePaths(await getLocalizedSlugs('pages', page.id)),
  })
}

export default async function SlugPage({ params }: Args) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  // The "home" page lives at "/" (or "/en"), not "/home".
  if (slug === 'home') permanentRedirect(localePath(lang))

  const page = await getPageBySlug(slug, lang)
  if (!page) {
    // A slug from the other language (/en/hinnasto) goes to this language's own (/en/pricing).
    const own = await findSlugInLocale('pages', slug, lang)
    if (own && own !== slug) permanentRedirect(localePath(lang, `/${own}`))
    notFound()
  }

  return <PageView page={page} locale={lang} />
}
