/**
 * Payload returns upload URLs as absolute addresses (http://localhost:3002/api/media/file/x.webp,
 * https://velarcloud.fi/api/media/…) because serverURL is set. next/image only allows our own
 * uploads by relative path (images.localPatterns in next.config.ts), so strip the origin.
 * URLs from anywhere else are returned unchanged.
 */
export function mediaSrc(url: string): string {
  const parsed = new URL(url, 'http://local')
  return parsed.pathname.startsWith('/api/media/file/') ? `${parsed.pathname}${parsed.search}` : url
}
