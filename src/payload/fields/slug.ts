import { slugField } from 'payload'

/**
 * "Ota yhteyttä" → "ota-yhteytta", "Käyttöehdot" → "kayttoehdot". Payload's default
 * slugify drops ä/ö/å entirely ("ota-yhteytt"), so diacritics are folded first.
 */
export const toSlug = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Slug per language (/hinnasto in Finnish, /en/pricing in English), generated from the title. */
export const localizedSlugField = () =>
  slugField({
    localized: true,
    slugify: ({ valueToSlugify }) => (typeof valueToSlugify === 'string' ? toSlug(valueToSlugify) : undefined),
  })
