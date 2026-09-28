# VelarCloud

Website built with Next.js 16 + Payload CMS 3 (Postgres), deployed from GitHub to Dokploy.

## Local development

```bash
createdb velarcloud_dev      # local Postgres (Homebrew)
cp .env.example .env.local   # fill in DATABASE_URI + PAYLOAD_SECRET (openssl rand -base64 32)
npm install
npm run migrate              # apply committed migrations
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (create the first user on first visit)

Publish a page with slug `home` to fill the front page. Other pages are served at `/<slug>`.

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

Healthcheck: `GET /api/health` → `{"ok":true}`.
