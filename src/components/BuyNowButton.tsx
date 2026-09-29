type BuyNowButtonProps = {
  className?: string
}

export function BuyNowButton({ className = '' }: BuyNowButtonProps) {
  return (
    <button
      type="button"
      className={`w-full rounded-md bg-accent px-6 py-3 font-semibold text-foreground hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:w-auto ${className}`}
    >
      Buy now
    </button>
  )
}
