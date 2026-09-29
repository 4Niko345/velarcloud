import type { Page } from '@/payload/payload-types'
import { Benefits } from './Benefits'
import { Cta } from './Cta'
import { Faq } from './Faq'
import { Features } from './Features'
import { Hero } from './Hero'
import { LogoCloud } from './LogoCloud'
import { Pricing } from './Pricing'
import type { SectionContext } from './shared'

type Section = NonNullable<Page['layout']>[number]

/** Renders a page's layout blocks (defined in src/payload/blocks) in order. */
export function RenderSections({ sections, ctx }: { sections: Section[]; ctx: SectionContext }) {
  return sections.map((block, index) => {
    const key = block.id ?? index
    switch (block.blockType) {
      case 'hero':
        return <Hero key={key} block={block} ctx={ctx} />
      case 'logoCloud':
        return <LogoCloud key={key} block={block} />
      case 'features':
        return <Features key={key} block={block} ctx={ctx} />
      case 'benefits':
        return <Benefits key={key} block={block} />
      case 'pricing':
        return <Pricing key={key} block={block} ctx={ctx} />
      case 'faq':
        return <Faq key={key} block={block} />
      case 'cta':
        return <Cta key={key} block={block} ctx={ctx} />
      default:
        return null
    }
  })
}
