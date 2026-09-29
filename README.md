# VelarCloud

Single-page website for Velar Cloud (Finnish + English), built with Next.js 16 + Payload CMS 3
(Postgres), deployed from GitHub to Dokploy.

## Local development

Node 22 (`.nvmrc`) and a local Postgres (Postgres.app or Homebrew).

```bash
createdb velarcloud_dev      # Postgres.app: /Applications/Postgres.app/Contents/Versions/latest/bin/createdb
cp .env.example .env.local   # fill in DATABASE_URI + PAYLOAD_SECRET (openssl rand -base64 32)
npm install
npm run migrate              # apply committed migrations
npm run seed                 # front page + site settings in fi/en (skips what exists)
npm run dev
```

- Site: http://localhost:3000 (Finnish) and http://localhost:3000/en (English)
- Admin: http://localhost:3000/admin (create the first user on first visit)

## Content and languages

- **Languages** are defined once in `src/i18n/config.ts`. Finnish is the default and has no URL
  prefix (`/`, `/<slug>`); English lives under `/en`. `src/proxy.ts` does the routing.
- **Front page** = the published page with slug `home`, built from sections (Hero, Logo row,
  Features, Benefits, Pricing, FAQ, Call to action) under *Pages → Sections*. Each section's
  optional *anchor* makes it reachable at `#anchor` for the menu.
- **Translating**: switch the locale at the top of the admin editor and fill in the text.
  Untranslated fields fall back to Finnish. Structure (order, prices, icons) is shared.
- **Site settings** (global): menu, login link, header button, the free-trial and booking URLs
  every "trial"/"call" button uses, contact email, social links, footer and legal links.
- Other pages (e.g. privacy policy) use *Simple page* and are served at `/<slug>` and `/en/<slug>`.
- Fixed interface text (menu labels for screen readers, 404 text…) is in `src/i18n/dictionaries.ts`.

### Schema changes

```bash
npm run migrate:create add_something
npm run migrate
```

Commit the generated files in `src/payload/migrations/` with the config change.

## Deploy (Dokploy)

Push to `main` → Dokploy builds the `Dockerfile` → `entrypoint.sh` runs migrations → `next start`.

One-time setup in Dokploy:

1. **Database:** create a PostgreSQL service. Copy its internal connection URL.
2. **Application:** create an app → Provider: GitHub → repo `millaelena/velarcloud`, branch `main`,
   Build type: **Dockerfile**. Enable **Auto Deploy**.
3. **Environment:**
   ```
   DATABASE_URI=<internal postgres URL>
   PAYLOAD_SECRET=<openssl rand -base64 32>
   NEXT_PUBLIC_SERVER_URL=https://<your-domain>
   ```
   **Build Time Arguments:**
   ```
   NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<openssl rand -base64 32>   # same value every deploy
   ```
4. **Volumes:** mount a volume at `/app/media` (uploaded files).
5. **Domains:** add the domain, container port `3000`, HTTPS on.
6. Deploy, then open `https://<your-domain>/admin` and create the first admin user.
7. Optional starting content: run `npm run seed` once in the container's terminal (Dokploy →
   application → Terminal). It only fills what is missing.

Healthcheck: `GET /api/health` → `{"ok":true}`.
