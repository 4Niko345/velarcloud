import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Payload-generated files
    'src/payload/payload-types.ts',
    'src/payload/migrations/**',
    'src/app/(payload)/admin/importMap.js',
    // Claude Code worktrees are full repo copies
    '.claude/**',
  ]),
])

export default eslintConfig
