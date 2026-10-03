import Link from 'next/link'
import { ctaHover } from '@/components/ui/ButtonLink'

// not-found.tsx gets no params, so the message is in both languages.
export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:py-32">
      <p className="font-display text-6xl font-semibold text-brand-ink">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
        <span lang="fi">Sivua ei löytynyt</span>
        <span aria-hidden className="mx-2 text-muted">
          ·
        </span>
        <span lang="en">Page not found</span>
      </h1>
      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          lang="fi"
          className={`inline-flex min-h-11 items-center justify-center rounded-full bg-brand-ink px-6 text-sm font-semibold text-white hover:bg-brand-deep ${ctaHover}`}
        >
          Etusivulle
        </Link>
        <Link
          href="/en"
          lang="en"
          className={`inline-flex min-h-11 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-semibold hover:border-brand-ink hover:text-brand-ink ${ctaHover}`}
        >
          Go to the homepage
        </Link>
      </div>
    </section>
  )
}
