import Link from 'next/link'
import { PageView } from '@/components/PageView'
import { getPageBySlug } from '@/lib/pages'

// Content comes from Payload at request time — no database needed at build.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const page = await getPageBySlug('home')
  if (page) return <PageView page={page} />

  // Placeholder until a published page with slug "home" exists in the admin.
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 text-center sm:py-32">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">VelarCloud</h1>
      <p className="mt-6 text-lg text-muted">
        Create and publish a page with the slug <code>home</code> to replace this placeholder.
      </p>
      <Link
        href="/admin"
        className="mt-10 inline-block rounded-md bg-brand px-6 py-3 font-semibold text-white hover:bg-brand-soft"
      >
        Open admin
      </Link>
    </section>
  )
}
