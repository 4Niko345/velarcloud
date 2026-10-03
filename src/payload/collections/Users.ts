import type { CollectionConfig, PayloadRequest } from 'payload'
import { formatAdminURL } from 'payload/shared'
import { authenticated } from '../access'
import { getEmailTemplate, renderEmail } from '../email/templates'
import type { User } from '../payload-types'

/** The "Forgot password" email from Email templates. Payload always passes req, token and user. */
async function forgotPasswordEmail(args?: { req?: PayloadRequest; token?: string; user?: User }) {
  const { req, token, user } = args ?? {}
  if (!req || !token || !user) throw new Error('Forgot password email: missing request, token or user.')
  const { config } = req.payload
  // From the configured server URL, never the request's Host header, so a
  // forged request can't point the reset link at another site.
  const link = formatAdminURL({
    adminRoute: config.routes.admin,
    path: `${config.admin.routes.reset}/${token}`,
    serverURL: config.serverURL,
  })
  const { template, locale } = await getEmailTemplate(req.payload, 'forgotPassword', req.locale)
  return renderEmail(template, { name: user.name || user.email, email: user.email, link }, locale)
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    forgotPassword: {
      generateEmailSubject: async (args) => (await forgotPasswordEmail(args)).subject,
      generateEmailHTML: async (args) => (await forgotPasswordEmail(args)).html,
    },
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [{ name: 'name', type: 'text' }],
}
