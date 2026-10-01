import type { Block } from 'payload'
import { BenefitsBlock } from './Benefits'
import { ContactBlock } from './Contact'
import { CtaBlock } from './Cta'
import { FaqBlock } from './Faq'
import { FeaturesBlock } from './Features'
import { HeroBlock } from './Hero'
import { LogoCloudBlock } from './LogoCloud'
import { PricingBlock } from './Pricing'
import { TestimonialsBlock } from './Testimonials'

/** Sections a page can be built from. Rendered by src/components/sections/RenderSections.tsx. */
export const pageBlocks: Block[] = [
  HeroBlock,
  LogoCloudBlock,
  FeaturesBlock,
  BenefitsBlock,
  TestimonialsBlock,
  PricingBlock,
  FaqBlock,
  ContactBlock,
  CtaBlock,
]
