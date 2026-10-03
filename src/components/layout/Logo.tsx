import Image from 'next/image'
import type { Media } from '@/payload/payload-types'
import { mediaSrc } from '@/lib/media'

/**
 * Temporary symbol until the real one is uploaded in Site settings → Logo:
 * a white cloud on a blue tile. Cloud outline from Lucide (ISC).
 */
function PlaceholderMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className="size-9 shrink-0">
      <rect width="40" height="40" rx="10" className="fill-brand-ink" />
      <path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        transform="translate(9.2 9.6) scale(0.9)"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Symbol on the left, the name as a wordmark on the right. */
export function Logo({ logo }: { logo?: Media | number | null }) {
  const uploaded = logo && typeof logo === 'object' && logo.url ? logo : null

  return (
    <span className="flex items-center gap-2">
      {uploaded?.url ? (
        <Image
          src={mediaSrc(uploaded.url)}
          alt=""
          width={uploaded.width ?? 160}
          height={uploaded.height ?? 160}
          className="h-9 w-auto shrink-0"
          priority
        />
      ) : (
        <PlaceholderMark />
      )}
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-lg font-semibold tracking-[0.32em]">VELAR</span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.55em] text-brand-soft">CLOUD</span>
      </span>
    </span>
  )
}
