import type { CollectionConfig } from 'payload'
import path from 'node:path'
import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    // /app/media in the container — mount a Dokploy volume there.
    staticDir: path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'hero', width: 1920 },
    ],
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
