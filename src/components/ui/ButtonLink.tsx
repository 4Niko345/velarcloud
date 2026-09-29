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

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'

const styles = {
  // Gold with near-black text: 8:1 contrast.
  primary: 'bg-gold text-ink-950 shadow-sm hover:bg-gold-strong',
  secondaryLight:
    'border border-foreground/15 bg-white text-foreground hover:border-gold-ink hover:text-gold-ink',
  secondaryDark: 'border border-gold/45 text-white hover:border-gold hover:bg-gold/10',
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
    (onDark ? ' focus-visible:outline-gold' : ' focus-visible:outline-gold-ink')
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
