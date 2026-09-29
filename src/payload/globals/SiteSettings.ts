import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { linkFields } from '../fields/link'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Announcement bar',
          fields: [
            {
              name: 'announcement',
              type: 'group',
              admin: { description: 'Thin bar above the header on every page, e.g. for the free trial.' },
              fields: [
                { name: 'enabled', label: 'Show the bar', type: 'checkbox', defaultValue: false },
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                  validate: (value: null | string | undefined, { siblingData }: { siblingData: { enabled?: boolean } }) =>
                    !siblingData?.enabled || Boolean(value) || 'Required while the bar is shown.',
                },
                ...linkFields({ appearance: false, required: false }),
              ],
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Light (white), tightly cropped logo for the dark header and footer. Without one, the name is shown as text.',
              },
            },
            {
              name: 'nav',
              label: 'Menu',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, localized: true },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                      admin: { description: '#section, /page or https://…' },
                    },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'loginLabel', type: 'text', localized: true },
                { name: 'loginUrl', type: 'text', admin: { description: 'Customer login, e.g. the app URL.' } },
              ],
            },
            { name: 'headerCta', label: 'Header button', type: 'group', fields: linkFields() },
          ],
        },
        {
          label: 'Links & contact',
          fields: [
            {
              name: 'trialUrl',
              type: 'text',
              localized: true,
              admin: { description: 'Where every "Free trial" button points.' },
            },
            {
              name: 'bookingUrl',
              type: 'text',
              localized: true,
              admin: { description: 'Where every "Book a call" button points.' },
            },
            { name: 'contactEmail', type: 'email' },
            {
              name: 'social',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: ['Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X'],
                    },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            { name: 'footerText', type: 'textarea', localized: true },
            {
              name: 'legalLinks',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, localized: true },
                    { name: 'url', type: 'text', required: true, localized: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
