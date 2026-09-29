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
  contact: 'Ota yhteyttä',
  legal: 'Ehdot',
  rightsReserved: 'Kaikki oikeudet pidätetään.',
  placeholder: 'Luo ja julkaise hallinnassa sivu, jonka tunniste on home, tai aja npm run seed.',
  openAdmin: 'Avaa hallinta',
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
  contact: 'Get in touch',
  legal: 'Legal',
  rightsReserved: 'All rights reserved.',
  placeholder: 'Create and publish a page with the slug home in the admin, or run npm run seed.',
  openAdmin: 'Open admin',
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
