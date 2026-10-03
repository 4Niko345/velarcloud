import type { Payload } from 'payload'
import { defaultLocale, hasLocale, type Locale } from '../../i18n/config'

// Emails whose texts are edited in the admin (Email templates). The texts are
// plain text with {{placeholders}}; renderEmail() puts them into the branded layout.

export type TemplateKey = 'forgotPassword' | 'contactThankYou'

export type EmailTemplate = { subject: string; heading: string; body: string; buttonLabel?: string }

/**
 * Starting texts. The admin shows them until a template is edited, and they are
 * used for any field that is left empty.
 */
export const defaultTemplates: Record<TemplateKey, Record<Locale, EmailTemplate>> = {
  forgotPassword: {
    fi: {
      subject: 'Salasanan palautus – Velar Cloud',
      heading: 'Aseta uusi salasana',
      body: [
        'Hei {{name}},',
        'saimme pyynnön palauttaa Velar Cloud -hallintapaneelin salasanasi. Voit asettaa uuden salasanan alla olevasta painikkeesta. Linkki on voimassa tunnin.',
        '{{button}}',
        'Jos et pyytänyt salasanan palautusta, voit jättää tämän viestin huomiotta. Salasanasi pysyy ennallaan.',
        'Jos painike ei toimi, kopioi tämä osoite selaimeen:\n{{link}}',
      ].join('\n\n'),
      buttonLabel: 'Aseta uusi salasana',
    },
    en: {
      subject: 'Reset your password – Velar Cloud',
      heading: 'Set a new password',
      body: [
        'Hi {{name}},',
        'we received a request to reset the password of your Velar Cloud admin account. Use the button below to set a new password. The link is valid for one hour.',
        '{{button}}',
        "If you didn't ask for this, you can ignore this email. Your password stays the same.",
        "If the button doesn't work, copy this address into your browser:\n{{link}}",
      ].join('\n\n'),
      buttonLabel: 'Set a new password',
    },
  },
  contactThankYou: {
    fi: {
      subject: 'Kiitos yhteydenotostasi – Velar Cloud',
      heading: 'Kiitos yhteydenotostasi!',
      body: [
        'Hei {{name}},',
        'kiitos viestistäsi. Olemme vastaanottaneet sen ja palaamme asiaan mahdollisimman pian.',
        'Ystävällisin terveisin\nVelar Cloud -tiimi',
      ].join('\n\n'),
    },
    en: {
      subject: 'Thank you for contacting us – Velar Cloud',
      heading: 'Thank you for getting in touch!',
      body: [
        'Hi {{name}},',
        'thank you for your message. We have received it and will get back to you as soon as possible.',
        'Best regards,\nThe Velar Cloud team',
      ].join('\n\n'),
    },
  },
}

const escapeHTML = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

const toLocale = (value: unknown): Locale => (typeof value === 'string' && hasLocale(value) ? value : defaultLocale)

/** The template in `locale` from the Email templates global, with defaults for empty fields. */
export async function getEmailTemplate(payload: Payload, key: TemplateKey, locale: unknown) {
  const lang = toLocale(locale)
  // No fallback: an untranslated English template uses the English default, not the Finnish text.
  const saved = await payload.findGlobal({ slug: 'email-templates', locale: lang, fallbackLocale: false, depth: 0 })
  const fields: { [K in keyof EmailTemplate]?: string | null } = saved[key] ?? {}
  const defaults = defaultTemplates[key][lang]
  const template: EmailTemplate = {
    subject: fields.subject || defaults.subject,
    heading: fields.heading || defaults.heading,
    body: fields.body || defaults.body,
    buttonLabel: fields.buttonLabel || defaults.buttonLabel,
  }
  return { template, locale: lang }
}

const placeholder = /\{\{\s*(\w+)\s*\}\}/g

/** Fills {{placeholders}}. Unknown ones stay visible so a typo is easy to spot. */
function fill(
  text: string,
  values: Record<string, string>,
  encode: (value: string, key: string) => string = (value) => value,
) {
  return (
    text
      .replace(placeholder, (match, key: string) => (key in values ? encode(values[key], key) : match))
      // "Hei {{name}}," with no name → "Hei,"
      .replace(/[ \t]+([,.!?])/g, '$1')
  )
}

/** A visitor-typed name made safe to repeat in an email: no links, short. */
export const cleanName = (value: string) =>
  value
    .replace(/\S*(?:https?:\/\/|www\.)\S*/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60)

const font = "font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;"

/**
 * Subject, HTML and plain-text versions of a template. `values` fill the
 * placeholders; {{link}} becomes a link and a paragraph that is just {{button}}
 * becomes a button to `values.link`.
 */
export function renderEmail(template: EmailTemplate, values: Record<string, string>, locale: Locale) {
  const link = values.link
  const subject = fill(template.subject, values)
  const paragraphs = template.body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)

  const html = paragraphs
    .map((paragraph) => {
      if (paragraph === '{{button}}') {
        if (!link || !template.buttonLabel) return ''
        return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px"><tr><td style="border-radius:999px;background:#1f66d1"><a href="${escapeHTML(link)}" style="${font}display:inline-block;padding:13px 26px;border-radius:999px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none">${escapeHTML(template.buttonLabel)}</a></td></tr></table>`
      }
      const inner = fill(escapeHTML(paragraph), { ...values, button: '' }, (value, key) =>
        key === 'link'
          ? `<a href="${escapeHTML(value)}" style="color:#1f66d1;word-break:break-all">${escapeHTML(value)}</a>`
          : escapeHTML(value),
      ).replace(/\n/g, '<br>')
      return `<p style="margin:0 0 16px">${inner}</p>`
    })
    .join('')

  const text = [
    fill(template.heading, values),
    ...paragraphs.map((paragraph) =>
      paragraph === '{{button}}'
        ? link && template.buttonLabel
          ? `${template.buttonLabel}: ${link}`
          : ''
        : fill(paragraph, { ...values, button: '' }),
    ),
  ]
    .filter(Boolean)
    .join('\n\n')

  return {
    subject,
    text,
    html: `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHTML(subject)}</title></head>
<body style="margin:0;padding:0;background:#f4f7fa">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7fa;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden">
<tr><td style="${font}background:#002244;padding:20px 28px;font-size:18px;font-weight:bold;letter-spacing:6px;color:#ffffff">VELAR <span style="font-size:11px;letter-spacing:5px;color:#8ec5ff">CLOUD</span></td></tr>
<tr><td style="${font}padding:32px 28px 16px;font-size:16px;line-height:1.6;color:#0b1b33">
<h1 style="margin:0 0 20px;font-size:22px;line-height:1.3;color:#0b1b33">${fill(escapeHTML(template.heading), values, escapeHTML)}</h1>
${html}
</td></tr>
</table>
<p style="${font}margin:16px 0 0;font-size:12px;color:#52627a">Velar Cloud</p>
</td></tr>
</table>
</body>
</html>`,
  }
}
