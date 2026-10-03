import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'
import { getPageBySlug } from '@/lib/pages'
import { PageView } from '@/components/PageView'
import { ctaHover } from '@/components/ui/ButtonLink'

// Content comes from Payload at request time — no database needed at build.
export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const page = await getPageBySlug('home', lang)
  return pageMetadata({
    title: page?.title,
    description: page?.description,
    locale: lang,
    paths: Object.fromEntries(locales.map((code) => [code, localePath(code)])),
    absoluteTitle: true,
  })
}

export default async function HomePage({ params }: Args) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const page = await getPageBySlug('home', lang)
  if (page) return <PageView page={page} locale={lang} />

  // Until a published page with slug "home" exists (see `npm run seed`).
  const dict = getDictionary(lang)
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">Velar Cloud</h1>
      <p className="mt-6 text-lg text-muted">{dict.placeholder}</p>
      <Link
        href="/admin"
        className={`mt-10 inline-flex min-h-11 items-center rounded-full bg-brand-ink px-6 text-sm font-semibold text-white hover:bg-brand-deep ${ctaHover}`}
      >
        {dict.openAdmin}
      </Link>
    </section>
  )
}
