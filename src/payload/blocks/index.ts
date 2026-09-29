import type { Block } from 'payload'
import { BenefitsBlock } from './Benefits'
import { CtaBlock } from './Cta'
import { FaqBlock } from './Faq'
import { FeaturesBlock } from './Features'
import { HeroBlock } from './Hero'
import { LogoCloudBlock } from './LogoCloud'
import { PricingBlock } from './Pricing'

/** Sections a page can be built from. Rendered by src/components/sections/RenderSections.tsx. */
export const pageBlocks: Block[] = [
  HeroBlock,
  LogoCloudBlock,
  FeaturesBlock,
  BenefitsBlock,
  PricingBlock,
  FaqBlock,
  CtaBlock,
]
