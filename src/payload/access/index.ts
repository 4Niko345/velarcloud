import type { Access } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const anyone: Access = () => true

/** Logged-in users see everything; the public only sees published documents. */
export const authenticatedOrPublished: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
