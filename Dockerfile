FROM public.ecr.aws/docker/library/node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ──────────────────────────────────────────────────────────
FROM public.ecr.aws/docker/library/node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# `npm run build` loads payload.config.ts (generate:types). Dokploy doesn't
# inject runtime env vars into the build, so give the build a placeholder
# secret. Builder stage only — the runner never sees it.
ENV PAYLOAD_SECRET=build-only-placeholder

# Server action encryption key + deployment ID (Next self-hosting guide).
#
# Next derives every server action ID from the build's encryption key and
# randomizes the key each build, so every deploy breaks tabs opened before it
# ("Failed to find Server Action", 404 on form submits / admin actions).
# A fixed key keeps IDs stable across deploys.
#
# Set in Dokploy → Environment → Build Time Arguments:
#   NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<openssl rand -base64 32>
# Same value every deploy. Without it the build still works, unprotected.
#
# NEXT_DEPLOYMENT_ID: skew protection. Must be the SAME at build and run time,
# so it's written to a file that entrypoint.sh reads before `next start`.
# Defaults to the build timestamp; a Dokploy build arg (e.g. git SHA) wins.
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ARG NEXT_DEPLOYMENT_ID
RUN set -e; \
    id="${NEXT_DEPLOYMENT_ID:-$(date -u +%Y%m%d%H%M%S)}"; \
    printf '%s' "$id" > .deployment-id; \
    export NEXT_DEPLOYMENT_ID="$id"; \
    if [ -n "$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY" ]; then \
      export NEXT_SERVER_ACTIONS_ENCRYPTION_KEY; \
    else \
      unset NEXT_SERVER_ACTIONS_ENCRYPTION_KEY; \
      echo "⚠ NEXT_SERVER_ACTIONS_ENCRYPTION_KEY missing from build args: server action IDs change this deploy."; \
    fi; \
    npm run build

# ──────────────────────────────────────────────────────────
FROM public.ecr.aws/docker/library/node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# .next is owned by nextjs because `next start` writes the image optimization
# cache (.next/cache/images) at runtime — otherwise every /_next/image is 500.
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/public        ./public
COPY --from=builder /app/node_modules  ./node_modules
COPY --from=builder /app/package.json  ./package.json
COPY --from=builder /app/.deployment-id ./.deployment-id

# The Payload CLI (migrations in entrypoint.sh) needs the config and source.
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/next.config.ts    ./next.config.ts
COPY --from=builder /app/tsconfig.json     ./tsconfig.json
COPY --from=builder /app/src               ./src

# Persistent media uploads — mount a Dokploy volume at /app/media
RUN mkdir -p media && chown nextjs:nodejs media

COPY --chown=nextjs:nodejs entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health 2>/dev/null | grep -q '"ok"' || exit 1

CMD ["./entrypoint.sh"]
