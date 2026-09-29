import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { hasLocale, localePath } from '@/i18n/config'
import { pageMetadata } from '@/lib/metadata'
import { getPageBySlug } from '@/lib/pages'
import { PageView } from '@/components/PageView'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const page = await getPageBySlug(slug, lang)
  return page ? pageMetadata(page, lang, `/${slug}`) : {}
}

export default async function SlugPage({ params }: Args) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  // The "home" page lives at "/" (or "/en"), not "/home".
  if (slug === 'home') permanentRedirect(localePath(lang))

  const page = await getPageBySlug(slug, lang)
  if (!page) notFound()

  return <PageView page={page} locale={lang} />
}
