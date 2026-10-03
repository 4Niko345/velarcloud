import type { Locale } from './config'

// Fixed interface text. Everything editorial lives in Payload (localized fields).

const fi = {
  siteDescription: 'Velar Cloud – tehokas ja automatisoitu asiakkuudenhallinta yrityksesi kasvuun.',
  skipToContent: 'Siirry sisältöön',
  mainNav: 'Päävalikko',
  openMenu: 'Avaa valikko',
  closeMenu: 'Sulje valikko',
  language: 'Kieli',
  footerNav: 'Alatunnisteen linkit',
  explore: 'Tutustu',
  integrations: 'Integraatiot',
  contact: 'Ota yhteyttä',
  legal: 'Ehdot',
  rightsReserved: 'Kaikki oikeudet pidätetään.',
  placeholder: 'Luo ja julkaise hallinnassa sivu, jonka tunniste on home, tai aja npm run seed.',
  openAdmin: 'Avaa hallinta',
  billingPeriod: 'Laskutusjakso',
  form: {
    requiredNote: 'Tähdellä (*) merkityt kentät ovat pakollisia.',
    required: 'Täytä tämä kenttä.',
    requiredCheckbox: 'Valitse tämä jatkaaksesi.',
    invalidEmail: 'Tarkista sähköpostiosoite, esim. nimi@yritys.fi.',
    invalidNumber: 'Kirjoita numero.',
    choose: 'Valitse…',
    submit: 'Lähetä',
    sending: 'Lähetetään…',
    sent: 'Kiitos! Viestisi on lähetetty.',
    error: 'Viestiä ei voitu lähettää. Yritä hetken päästä uudelleen tai lähetä meille sähköpostia.',
    honeypot: 'Jätä tämä kenttä tyhjäksi',
  },
  blog: {
    title: 'Blogi',
    intro: 'Seuraa uusimpia asiakkuudenhallinnan, tekoälyn ja automaation trendejä.',
    readMore: 'Lue lisää',
    empty: 'Ensimmäiset artikkelit ovat tulossa pian.',
    back: 'Takaisin blogiin',
    dateLocale: 'fi-FI',
  },
  /** "{n}" is replaced with the star count. */
  rating: 'Arvio {n}/5 tähteä',
  quote: { open: '”', close: '”' },
  pricingCategories: {
    crm: 'CRM ja myynti',
    automation: 'Automaatio',
    website: 'Verkkosivut ja sisältö',
    marketing: 'Markkinointi ja kanavat',
    support: 'Tuki ja palvelut',
  },
  illustration: {
    pipeline: 'Myyntiputki',
    stages: ['Uudet', 'Tarjous', 'Voitettu'],
    automation: 'Automaatio',
    automationStatus: 'Seurantaviesti lähetetty',
    booking: 'Uusi ajanvaraus',
  },
}

export type Dictionary = typeof fi

const en: Dictionary = {
  siteDescription: 'Velar Cloud – the all-in-one CRM for business growth.',
  skipToContent: 'Skip to content',
  mainNav: 'Main menu',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
  footerNav: 'Footer links',
  explore: 'Explore',
  integrations: 'Integrations',
  contact: 'Get in touch',
  legal: 'Legal',
  rightsReserved: 'All rights reserved.',
  placeholder: 'Create and publish a page with the slug home in the admin, or run npm run seed.',
  openAdmin: 'Open admin',
  billingPeriod: 'Billing period',
  form: {
    requiredNote: 'Fields marked with an asterisk (*) are required.',
    required: 'Please fill in this field.',
    requiredCheckbox: 'Please tick this box to continue.',
    invalidEmail: 'Please check the email address, e.g. name@company.com.',
    invalidNumber: 'Please enter a number.',
    choose: 'Choose…',
    submit: 'Send',
    sending: 'Sending…',
    sent: 'Thank you! Your message has been sent.',
    error: "Your message couldn't be sent. Please try again in a moment or email us.",
    honeypot: 'Leave this field empty',
  },
  blog: {
    title: 'Blog',
    intro: 'Follow the latest trends in CRM, AI and automation.',
    readMore: 'Read more',
    empty: 'The first articles are coming soon.',
    back: 'Back to the blog',
    dateLocale: 'en-GB',
  },
  rating: 'Rated {n} out of 5',
  quote: { open: '“', close: '”' },
  pricingCategories: {
    crm: 'CRM & sales',
    automation: 'Automation',
    website: 'Websites & content',
    marketing: 'Marketing & channels',
    support: 'Support & services',
  },
  illustration: {
    pipeline: 'Sales pipeline',
    stages: ['New', 'Proposal', 'Won'],
    automation: 'Automation',
    automationStatus: 'Follow-up sent',
    booking: 'New booking',
  },
}

const dictionaries: Record<Locale, Dictionary> = { fi, en }

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
