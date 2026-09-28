#!/bin/sh
set -e

# Run Payload database migrations before starting the server.
# Idempotent: already-applied migrations are skipped.
# If a migration fails the container exits and Dokploy stops the deployment.
echo "→ Running database migrations..."
npm run migrate

# Deployment ID must match the build (Dockerfile writes .deployment-id),
# otherwise Next's skew protection doesn't work.
if [ -s .deployment-id ]; then
  NEXT_DEPLOYMENT_ID="$(cat .deployment-id)"
  export NEXT_DEPLOYMENT_ID
  echo "→ Deployment ID: $NEXT_DEPLOYMENT_ID"
fi

echo "→ Starting Next.js server..."
exec npm start
