import { NextResponse } from 'next/server'

// Docker healthcheck. Always ok while the server is up, so a brief database
// outage doesn't make Dokploy restart the container.
export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ ok: true })
}
