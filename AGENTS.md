<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# VelarCloud — agent rules

## 0. Don't commit or push yourself

Agents never run `git commit`, `git push`, merges, rebases or `gh pr create`. Make the
changes, verify them, leave them uncommitted and list the changed files. The user commits
and pushes. Exception only when the user explicitly asks in that conversation — for that
one time.

Pushing to `main` deploys to production (Dokploy auto-deploy).

## 1. Schema changes go through migrations

Production schema is built from committed migrations in `src/payload/migrations/`
(`entrypoint.sh` → `npm run migrate`, plus `prodMigrations` in `payload.config.ts`).

After changing any collection/global/field:

1. `npm run migrate:create <descriptive_name>`
2. Review the generated SQL.
3. `npm run migrate`
4. Commit the migration files together with the config change.

Never set `PAYLOAD_PUSH=true` in Dokploy or commit it.

## 2. Mobile-first

Design every view for ≤ 390 px first, then scale up.

## 3. Payload admin CSS isolation

`src/app/(payload)/layout.tsx` must NOT import `globals.css` — Tailwind's preflight
breaks the admin UI.

## Stack

- Next.js 16 (App Router) + Payload 3 in the same app, Postgres
- Tailwind v4 (`src/app/globals.css`, tokens in `@theme`)
- Deploy: GitHub `main` → Dokploy (Dockerfile) → `entrypoint.sh` migrates, then `next start`
- Payload versions are pinned exactly — upgrade all `@payloadcms/*` + `payload` together.

## Layout

- `payload.config.ts` — Payload config (root)
- `src/payload/collections/` — collections
- `src/payload/access/` — access functions
- `src/payload/migrations/` — committed migrations
- `src/app/(frontend)/` — public site
- `src/app/(payload)/` — admin + REST/GraphQL (generated boilerplate)
- `src/app/api/health/` — Docker healthcheck
