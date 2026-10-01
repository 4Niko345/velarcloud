import type { CollectionConfig } from 'payload'
import { authenticated, authenticatedOrPublished } from '../access'
import { pageBlocks } from '../blocks'
import { localizedSlugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description:
      'The page with slug "home" is the front page; others are served at /<slug> (Finnish) and /en/<slug> (English). Each language has its own slug.',
  },
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    localizedSlugField(),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Shown in search results and link previews.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          description: 'Build the page from sections. The front page uses these.',
          fields: [{ name: 'layout', type: 'blocks', blocks: pageBlocks }],
        },
        {
          label: 'Simple page',
          description: 'Used when there are no sections, e.g. a privacy policy.',
          fields: [
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', localized: true },
          ],
        },
      ],
    },
  ],
}
