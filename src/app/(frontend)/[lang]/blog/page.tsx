import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPath, hasLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'
import { getPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { PageHeader } from '@/components/PageHeader'

// Served at /blogi (Finnish) and /en/blog (English); see src/proxy.ts.
export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return pageMetadata({
    title: dict.blog.title,
    description: dict.blog.intro,
    locale: lang,
    paths: Object.fromEntries(locales.map((code) => [code, blogPath(code)])),
  })
}

export default async function BlogPage({ params }: Args) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const posts = await getPosts(lang)

  return (
    <>
      <PageHeader title={dict.blog.title} intro={dict.blog.intro} />
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} locale={lang} dict={dict} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-border bg-white px-6 py-16 text-center text-lg text-muted">
              {dict.blog.empty}
            </p>
          )}
        </div>
      </section>
    </>
  )
}
