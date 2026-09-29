import {
  CalendarClock,
  ChartColumn,
  CreditCard,
  LayoutTemplate,
  MessagesSquare,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import type { FeaturesBlock } from '@/payload/payload-types'

type FeatureIcon = NonNullable<FeaturesBlock['items']>[number]['icon']

// Options are defined in src/payload/blocks/Features.ts.
export const featureIcons: Record<FeatureIcon, LucideIcon> = {
  crm: Users,
  website: LayoutTemplate,
  automation: Workflow,
  messages: MessagesSquare,
  social: CalendarClock,
  payments: CreditCard,
  ai: Sparkles,
  reports: ChartColumn,
}
