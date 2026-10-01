import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { blogPath, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Post } from '@/payload/payload-types'
import { mediaSrc } from '@/lib/media'

export const formatDate = (iso: string, dict: Dictionary) =>
  new Intl.DateTimeFormat(dict.blog.dateLocale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))

/** Card in the blog list. The whole card is one link (the title is its accessible name). */
export function PostCard({ post, locale, dict }: { post: Post; locale: Locale; dict: Dictionary }) {
  const cover = typeof post.coverImage === 'object' ? post.coverImage : null
  const href = blogPath(locale, post.slug)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:border-brand/40 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-navy-900">
        {cover?.url ? (
          <Image
            src={mediaSrc(cover.url)}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
          />
        ) : (
          <span aria-hidden className="flex size-full items-center justify-center text-brand-soft/60">
            <Newspaper className="size-10" strokeWidth={1.25} />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-ink">
          {post.category && <span>{post.category} · </span>}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, dict)}</time>
        </p>
        <h2 className="mt-3 font-display text-xl font-semibold leading-snug">
          {/* Stretched link: the whole card is clickable. */}
          <Link
            href={href}
            className="rounded after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink"
          >
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 leading-relaxed text-muted">{post.excerpt}</p>}
        <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-ink">
          {dict.blog.readMore}
          <ArrowRight className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  )
}
