import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  // The dev-only Next.js badge sat on the left-aligned footer/hero text.
  devIndicators: { position: 'bottom-right' },
  images: {
    localPatterns: [{ pathname: '/api/media/file/**' }],
  },
}

export default withPayload(nextConfig)
