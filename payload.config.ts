import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Pages } from './src/payload/collections/Pages'
import { SiteSettings } from './src/payload/globals/SiteSettings'
import { migrations } from './src/payload/migrations'
import { defaultLocale, localeNames, locales } from './src/i18n/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET || '',

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, 'src'),
      importMapFile: path.resolve(dirname, 'src/app/(payload)/admin/importMap.js'),
    },
  },

  collections: [Pages, Media, Users],
  globals: [SiteSettings],

  // Content languages. Untranslated fields fall back to Finnish.
  localization: {
    locales: locales.map((code) => ({ code, label: localeNames[code].name })),
    defaultLocale,
    fallback: true,
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI },
    // Schema is managed with migrations in dev too, so dev and prod never drift.
    // Schema change: `npm run migrate:create` → `npm run migrate`.
    // PAYLOAD_PUSH=true is for quick local experiments only.
    push: process.env.PAYLOAD_PUSH === 'true',
    migrationDir: path.resolve(dirname, 'src/payload/migrations'),
    // In production Payload also runs these bundled migrations on connect,
    // as a safety net next to entrypoint.sh's `npm run migrate`.
    prodMigrations: migrations,
  }),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/payload-types.ts'),
  },
})
