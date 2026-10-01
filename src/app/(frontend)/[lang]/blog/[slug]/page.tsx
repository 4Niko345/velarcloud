import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, permanentRedirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { blogPath, hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { findSlugInLocale, getLocalizedSlugs } from '@/lib/localized'
import { pageMetadata } from '@/lib/metadata'
import { getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/components/blog/PostCard'
import { PageHeader } from '@/components/PageHeader'
import { RichTextContent } from '@/components/RichTextContent'
import { mediaSrc } from '@/lib/media'

export const dynamic = 'force-dynamic'

type Args = { params: Promise<{ lang: string; slug: string }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const post = await getPostBySlug(slug, lang)
  if (!post) return {}
  const slugs = await getLocalizedSlugs('posts', post.id)
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    locale: lang,
    paths: Object.fromEntries(
      Object.entries(slugs).map(([code, own]) => [code, blogPath(code as Locale, own)]),
    ),
    type: 'article',
  })
}

export default async function PostPage({ params }: Args) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const post = await getPostBySlug(slug, lang)
  if (!post) {
    // A slug from the other language goes to this language's own version of the article.
    const own = await findSlugInLocale('posts', slug, lang)
    if (own && own !== slug) permanentRedirect(blogPath(lang, own))
    notFound()
  }

  const dict = getDictionary(lang)
  const cover = typeof post.coverImage === 'object' ? post.coverImage : null

  return (
    <article>
      <PageHeader title={post.title} intro={post.excerpt}>
        <Link
          href={blogPath(lang)}
          className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-white/75 hover:text-white focus-visible:outline-2 focus-visible:outline-brand-soft"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {dict.blog.back}
        </Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-brand-soft">
          {post.category && <span>{post.category} · </span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, dict)}</time>
        </p>
      </PageHeader>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {cover?.url && (
          <Image
            src={mediaSrc(cover.url)}
            alt={cover.alt}
            width={cover.width ?? 1600}
            height={cover.height ?? 900}
            sizes="(min-width: 768px) 768px, 100vw"
            className="mb-10 h-auto w-full rounded-2xl border border-border"
            priority
          />
        )}
        {post.content && <RichTextContent data={post.content} />}
      </div>
    </article>
  )
}
