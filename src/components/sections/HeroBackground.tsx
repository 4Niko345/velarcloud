/**
 * Charcoal-black with a fine gold lattice of interlocking eight-point stars and
 * a few long hairline curves woven across it. Kept faint and faded out behind
 * the text column so it reads as texture, not decoration.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Depth: a slightly lifted, warm charcoal from the top right. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_85%_0%,rgb(46_42_36/0.85),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_10%_100%,rgb(200_165_90/0.06),transparent_70%)]" />

      {/* Star lattice, strongest top right, gone behind the text (phones: corner only). */}
      <svg className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_70%_30%_at_100%_0%,black_10%,transparent_85%)] lg:[mask-image:radial-gradient(ellipse_75%_85%_at_85%_15%,black_5%,transparent_80%)]">
        <defs>
          <pattern id="hero-star-lattice" width="96" height="96" patternUnits="userSpaceOnUse">
            <g fill="none" className="stroke-gold" strokeWidth="0.75" strokeOpacity="0.38">
              {/* Square + diamond = eight-point star */}
              <path d="M24 24H72V72H24Z" />
              <path d="M48 14L82 48L48 82L14 48Z" />
              {/* Links to the neighbouring stars */}
              <path d="M48 0V14M48 82V96M0 48H14M82 48H96" />
              <path d="M0 0L24 24M96 0L72 24M0 96L24 72M96 96L72 72" />
              {/* Small diamonds where four tiles meet */}
              <path d="M0 12L12 0M84 0L96 12M96 84L84 96M12 96L0 84" />
            </g>
            {/* Inner octagon, fainter, for the interlaced look */}
            <path
              d="M42 34H54L62 42V54L54 62H42L34 54V42Z"
              fill="none"
              className="stroke-gold"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-star-lattice)" />
      </svg>

      {/* Long hairline curves weaving over and under each other, faded behind the text
          (phones: only around the illustration below it). */}
      <svg
        className="absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,transparent_60%,black_85%)] lg:[mask-image:linear-gradient(to_right,transparent_15%,black_60%)]"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-gold-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: 'var(--color-gold)', stopOpacity: 0 }} />
            <stop offset="0.45" style={{ stopColor: 'var(--color-gold-soft)', stopOpacity: 0.55 }} />
            <stop offset="1" style={{ stopColor: 'var(--color-gold)', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        {/* non-scaling-stroke keeps them hairline at any hero size (not inherited, so per path). */}
        <g stroke="url(#hero-gold-line)">
          <path
            d="M-80 690C320 520 640 610 980 380S1380 90 1540 40"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-40 250C360 400 700 170 1040 330S1360 620 1520 560"
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M260 860C460 600 820 700 1100 460S1340 180 1480 170"
            strokeWidth="0.6"
            strokeOpacity="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      {/* Hairline gold rule along the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,rgb(200_165_90/0.45),transparent)]" />
    </div>
  )
}
