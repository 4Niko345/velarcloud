import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { PageView } from '@/components/PageView'
import { getPageBySlug } from '@/lib/pages'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return {}
  return { title: page.title, description: page.description ?? undefined }
}

export default async function SlugPage({ params }: Args) {
  const { slug } = await params
  // The "home" page lives at "/", not "/home".
  if (slug === 'home') permanentRedirect('/')

  const page = await getPageBySlug(slug)
  if (!page) notFound()

  return <PageView page={page} />
}
