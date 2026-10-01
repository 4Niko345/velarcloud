import Image from 'next/image'
import type { Media } from '@/payload/payload-types'
import { mediaSrc } from '@/lib/media'

/** Uploaded logo from Site settings, or the name set as a wordmark. */
export function Logo({ logo }: { logo?: Media | number | null }) {
  if (logo && typeof logo === 'object' && logo.url) {
    return (
      <Image
        src={mediaSrc(logo.url)}
        alt={logo.alt || 'Velar Cloud'}
        width={logo.width ?? 160}
        height={logo.height ?? 160}
        className="h-10 w-auto"
        priority
      />
    )
  }

  return (
    <span className="flex flex-col items-center leading-none">
      <span className="font-display text-lg font-semibold tracking-[0.32em]">VELAR</span>
      <span className="mt-1 text-[0.55rem] font-medium tracking-[0.55em] text-brand-soft">CLOUD</span>
    </span>
  )
}
