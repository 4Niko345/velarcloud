import Link from 'next/link'
import { isExternal } from '@/lib/links'

type ButtonLinkProps = {
  href: string
  children: React.ReactNode
  appearance?: 'primary' | 'secondary'
  /** Secondary buttons need light borders and text on navy backgrounds. */
  onDark?: boolean
  className?: string
}

/**
 * Hover for every call-to-action button: a small lift and a soft blue glow. The lift
 * is skipped for reduced motion; hover only applies on devices that can hover.
 */
export const ctaHover =
  'transition-all duration-300 ease-out hover:shadow-lg hover:shadow-brand/30 motion-safe:hover:-translate-y-0.5'

const base = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${ctaHover}`

const styles = {
  // Blue with white text: 5.4:1 contrast.
  primary: 'bg-brand-ink text-white shadow-sm hover:bg-brand-deep',
  secondaryLight:
    'border border-foreground/15 bg-white text-foreground hover:border-brand-ink hover:text-brand-ink',
  secondaryDark: 'border border-white/30 text-white hover:border-brand-soft hover:bg-white/10',
}

export function ButtonLink({
  href,
  children,
  appearance = 'primary',
  onDark = false,
  className = '',
}: ButtonLinkProps) {
  const style =
    (appearance === 'primary' ? styles.primary : onDark ? styles.secondaryDark : styles.secondaryLight) +
    (onDark ? ' focus-visible:outline-brand-soft' : ' focus-visible:outline-brand-ink')
  const classes = `${base} ${style} ${className}`

  if (href.startsWith('/') && !isExternal(href)) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  )
}
