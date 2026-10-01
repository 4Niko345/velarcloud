import type { Page } from '@/payload/payload-types'
import { Benefits } from './Benefits'
import { Contact } from './Contact'
import { Cta } from './Cta'
import { Faq } from './Faq'
import { Features } from './Features'
import { Hero } from './Hero'
import { LogoCloud } from './LogoCloud'
import { Pricing } from './Pricing'
import { Testimonials } from './Testimonials'
import type { SectionContext } from './shared'

type Section = NonNullable<Page['layout']>[number]

/** Renders a page's layout blocks (defined in src/payload/blocks) in order. */
export function RenderSections({ sections, ctx }: { sections: Section[]; ctx: SectionContext }) {
  return sections.map((block, index) => {
    const key = block.id ?? index
    // The first section carries the page's h1 (the hero always does).
    const sectionCtx: SectionContext = { ...ctx, headingLevel: index === 0 ? 'h1' : 'h2' }
    switch (block.blockType) {
      case 'hero':
        return <Hero key={key} block={block} ctx={sectionCtx} />
      case 'logoCloud':
        return <LogoCloud key={key} block={block} />
      case 'features':
        return <Features key={key} block={block} ctx={sectionCtx} />
      case 'benefits':
        return <Benefits key={key} block={block} ctx={sectionCtx} />
      case 'testimonials':
        return <Testimonials key={key} block={block} ctx={sectionCtx} />
      case 'pricing':
        return <Pricing key={key} block={block} ctx={sectionCtx} />
      case 'faq':
        return <Faq key={key} block={block} ctx={sectionCtx} />
      case 'contact':
        return <Contact key={key} block={block} ctx={sectionCtx} />
      case 'cta':
        return <Cta key={key} block={block} ctx={sectionCtx} />
      default:
        return null
    }
  })
}
