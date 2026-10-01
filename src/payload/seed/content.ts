// Starting content for the front page and site settings, in both languages.
// Facts, prices and links are taken from the previous velarcloud.fi / .com sites.
// `t(fi, en)` marks a localized value; everything else is shared.

export type Localized = { fi: string; en: string }
const t = (fi: string, en: string): Localized => ({ fi, en })

const trial = (label: Localized, appearance: 'primary' | 'secondary' = 'primary') => ({
  label,
  kind: 'trial',
  appearance,
})
type Category = 'crm' | 'automation' | 'website' | 'marketing' | 'support'
const f = (category: Category, fi: string, en: string) => ({ category, text: t(fi, en) })

const booking = (label: Localized, appearance: 'primary' | 'secondary' = 'secondary') => ({
  label,
  kind: 'booking',
  appearance,
})

// Photos from the old velarcloud.fi (approved), optimized into ./media. The seed uploads
// them to the Media collection and swaps media('key') for the uploaded document.
export const mediaFiles = {
  dashboard: { file: 'dashboard.webp', alt: t('Velar Cloudin analytiikkanäkymä näytöllä toimistossa', 'Velar Cloud analytics dashboard on an office screen') },
  messages: { file: 'messages.webp', alt: t('Tabletti ja puhelin, joissa saapuvat viestit', 'Tablet and phone showing incoming messages') },
  crmLaptop: { file: 'crm-laptop.webp', alt: t('Kannettava, jossa Velar Cloudin asiakkuudenhallinta', 'Laptop showing Velar Cloud CRM') },
  automation: { file: 'automation.webp', alt: t('Automaation työnkulku kannettavan näytöllä', 'An automation workflow on a laptop screen') },
  funnels: { file: 'funnels.webp', alt: t('Kuvitus myyntisuppilosta Velar Cloudissa', 'Illustration of a sales funnel in Velar Cloud') },
  team: { file: 'team.webp', alt: t('Tiimi suunnittelee yhdessä toimistolla', 'A team planning together in the office') },
  reports: { file: 'reports.webp', alt: t('Raportteja tabletilla, puhelimella ja kannettavalla', 'Reports on a tablet, phone and laptop') },
  socialPlanning: { file: 'social-planning.webp', alt: t('Kuvitus tiimistä suunnittelemassa sisältöä', 'Illustration of a team planning content') },
} as const

export type MediaKey = keyof typeof mediaFiles
export const media = (key: MediaKey) => ({ $media: key })

// Sections used on more than one page.
const pricingSection = {
  blockType: 'pricing',
  anchor: 'pricing',
  eyebrow: t('Hinnasto', 'Pricing'),
  heading: t('Valitse yrityksellesi sopiva paketti', 'Choose the right plan for your business'),
  text: t(
    'Kaikki paketit alkavat 14 päivän maksuttomalla kokeilulla.',
    'Every plan starts with a 14-day free trial.',
  ),
  // Yearly billing, as specified by Velar Cloud: $77/$237/$397 a month ($924/$2,844/$4,764 a year),
  // at least 20% off. Checkout must offer it too.
  billing: {
    monthlyLabel: t('Kuukausittain', 'Monthly'),
    yearlyLabel: t('Vuosittain', 'Yearly'),
    savingsLabel: t('Säästä 20%', 'Save 20%'),
    yearlyNote: t('Laskutetaan vuosittain {total}/v', '{total} billed annually'),
  },
  plans: [
    {
      name: t('Perus', 'Basic'),
      icon: 'rocket',
      price: '$97',
      yearlyPrice: '$77',
      period: t('/ kk', '/ mo'),
      description: t(
        'Perustyökalut asiakkuuksien ja myynnin hallintaan.',
        'The core tools for managing customers and sales.',
      ),
      featuresHeading: t('Sisältää:', 'Includes:'),
      features: [
        f('support', 'Helppo ja nopea käyttöönotto', 'Effortless setup and integration'),
        f('crm', 'Asiakkuudenhallinta ja myyntimahdollisuuksien seuranta', 'CRM for lead and customer management'),
        f('website', 'Verkkosivujen luominen vaivattomasti', 'Build websites with ease'),
        f('website', 'Työkalut verkkokurssien rakentamiseen', 'Course builder'),
        f('automation', 'Automaatiotyökalut työnkulkujen tehostamiseen', 'Automation workflow builder'),
        f('crm', 'Kaikki asiakasviestintä yhdessä paikassa', 'All-in-one client communication'),
        f('crm', 'Tiimien ja tehtävien hallinta', 'Task management'),
        f('crm', 'Kalenterin integrointi ja ajanvaraukset', 'Integrated calendar and bookings'),
        f('support', 'Sähköpostituki', 'Email support'),
      ],
      link: trial(t('Valitse Perus', 'Choose Basic'), 'secondary'),
    },
    {
      name: t('Ammattilainen', 'Pro'),
      icon: 'star',
      price: '$297',
      yearlyPrice: '$237',
      period: t('/ kk', '/ mo'),
      highlighted: true,
      description: t(
        'Kasvavalle yritykselle, joka haluaa automatisoida myynnin ja markkinoinnin.',
        'For growing businesses that want to automate sales and marketing.',
      ),
      featuresHeading: t('Kaikki Perus-paketista, lisäksi:', 'Everything in Basic, plus:'),
      features: [
        f('marketing', 'Sosiaalisen median kanavien hallinta ja ajastaminen', 'Social media integration and scheduling'),
        f('crm', 'Rajattomasti käyttäjiä ja yhteystietoja', 'Unlimited team seats and contacts'),
        f('automation', 'Tekoälyä hyödyntävät automaatiot', 'AI-powered workflows and automation'),
        f('crm', 'Automaattinen liidien vastaanotto ja hallinta', 'Automated lead intake and management'),
        f('automation', 'Kehittyneet myynnin ja markkinoinnin automaatiot', 'Advanced sales and marketing automation'),
        f('website', 'Verkkosivujen integrointi ja ylläpito', 'Website integration and hosting'),
        f('marketing', 'WhatsApp-integraatio', 'WhatsApp integration'),
        f('marketing', 'Hakukoneoptimoinnin (SEO) työkalut', 'SEO tools'),
        f('website', 'Jäsenyys- ja yhteisötyökalut', 'Membership and community tools'),
        f('support', 'Chat- ja puhelintuki', 'Chat and phone support'),
      ],
      link: trial(t('Valitse Ammattilainen', 'Choose Pro')),
    },
    {
      name: t('Eliitti', 'Agency'),
      icon: 'crown',
      price: '$497',
      yearlyPrice: '$397',
      period: t('/ kk', '/ mo'),
      description: t(
        'Toimistoille ja yrityksille, jotka haluavat kaiken irti automaatiosta.',
        'For agencies and businesses that want the most out of automation.',
      ),
      featuresHeading: t('Kaikki Ammattilainen-paketista, lisäksi:', 'Everything in Pro, plus:'),
      features: [
        f('automation', 'Laajennetut automaatiot markkinointiin', 'Advanced agency automations'),
        f('marketing', 'Skaalautuvat myynti- ja markkinointikampanjat', 'Scalable sales and marketing drip campaigns'),
        f('automation', 'Liidien jakelu tehokkaisiin myyntisuppiloihin', 'Lead distribution for high-converting funnels'),
        f('crm', 'Mukautettavat lomakkeet ja asiakaskyselyt', 'Custom qualifying forms and surveys'),
        f('crm', 'Räätälöidyt kalenteriratkaisut', 'Dedicated calendar setup'),
        f('support', 'Velarin asiantuntijat ja ensiluokkainen tuki', 'Access to Velar Cloud experts and premium support'),
        f('support', 'Palvelun brändäys omalla ilmeellä (white label)', 'Reseller licenses for white-labeling'),
      ],
      link: trial(t('Valitse Eliitti', 'Choose Agency'), 'secondary'),
    },
  ],
}

const faqSection = {
  blockType: 'faq',
  anchor: 'faq',
  eyebrow: t('UKK', 'FAQ'),
  heading: t('Usein kysytyt kysymykset', 'Frequently asked questions'),
  text: t(
    'Etkö löytänyt vastausta? Varaa ilmainen puhelu tai lähetä meille sähköpostia.',
    "Didn't find your answer? Book a free call or send us an email.",
  ),
  items: [
    {
      question: t('Miten Velar Cloud voi auttaa yritystäni?', 'How does Velar Cloud help my business?'),
      answer: t(
        'Velar Cloud tarjoaa kaiken, mitä tarvitset yrityksesi hallintaan ja kasvuun: asiakkuudenhallinnan, markkinoinnin automaation, myyntikanavat ja paljon muuta. Yksi selkeä alusta säästää aikaa ja nopeuttaa tuloksia.',
        'Velar Cloud gives you everything you need to manage and grow your business: CRM, marketing automation, sales funnels and more, in one easy-to-use platform. It saves time and helps you get results faster.',
      ),
    },
    {
      question: t('Millaisille yrityksille Velar Cloud sopii?', 'What kind of businesses can use Velar Cloud?'),
      answer: t(
        'Kaiken kokoisille yrityksille, niin aloittaville kuin vakiintuneillekin: pienyrityksille, yrittäjille, toimistoille ja verkkokaupoille. Jos haluat tehostaa myyntiä ja markkinointia, Velar Cloud on hyvä valinta.',
        "Any business that wants to simplify its operations, automate tasks and grow, whether you're a small business, freelancer, agency or online seller.",
      ),
    },
    {
      question: t('Sopiiko Velar Cloud myyntimahdollisuuksien hallintaan?', 'Is Velar Cloud good for managing leads?'),
      answer: t(
        'Kyllä. Sisäänrakennettu asiakkuudenhallinta auttaa seuraamaan liidejä ja myyntimahdollisuuksia, hallitsemaan asiakassuhteita ja olemaan yhteydessä oikeaan aikaan.',
        'Yes. The built-in CRM helps you track leads and opportunities, manage contacts and follow up at the right time, so you always know where each lead stands.',
      ),
    },
    {
      question: t('Voiko Velar Cloud automatisoida markkinointini?', 'Can Velar Cloud automate my marketing?'),
      answer: t(
        'Kyllä. Voit automatisoida sähköpostikampanjat, seurantaviestit ja työnkulut. Määritä ne kerran, ja Velar Cloud hoitaa loput.',
        'Yes. Automate email campaigns, follow-ups and workflows. Set them up once and let Velar Cloud do the rest.',
      ),
    },
    {
      question: t('Miksi Velar Cloud on hyvä valinta?', 'What makes Velar Cloud different?'),
      answer: t(
        'Velar Cloud kokoaa tärkeimmät työkalut yhteen: CRM:n, markkinoinnin, myyntisuppilot ja automaation. Et tarvitse useita erillisiä ohjelmia, mikä säästää aikaa ja rahaa.',
        'Instead of juggling multiple tools, Velar Cloud brings CRM, marketing, funnels and automation together in one platform that grows with you.',
      ),
    },
    {
      question: t('Kuinka nopeasti pääsen alkuun?', 'How quickly can I get started?'),
      answer: t(
        'Käyttöönotto on nopeaa ja vaivatonta. Tilauksen jälkeen saat työkalut nopeasti käyttöösi ja voit keskittyä liiketoimintasi kasvattamiseen.',
        'Setup is quick and easy. Once you subscribe, you get access to your tools right away and can focus on growing your business.',
      ),
    },
  ],
}

const ctaSection = {
  blockType: 'cta',
  anchor: 'contact',
  heading: t('Valmis kokeilemaan?', 'Ready to get started?'),
  text: t(
    'Aloita 14 päivän maksuton kokeilu tai varaa ilmainen puhelu, niin käydään yhdessä läpi, miten Velar Cloud sopii yrityksellesi.',
    "Start your 14-day free trial, or book a free call and we'll walk through how Velar Cloud fits your business.",
  ),
  links: [
    trial(t('Kokeile maksutta 14 päivää', 'Start your free trial')),
    booking(t('Varaa ilmainen puhelu', 'Book a free call')),
  ],
  showEmail: true,
}

export const homePage = {
  slug: 'home',
  generateSlug: false,
  title: t(
    'Velar Cloud – Tehokas asiakkuudenhallintajärjestelmä (CRM)',
    'Velar Cloud – The All-in-One CRM for Business Growth',
  ),
  description: t(
    'Velar Cloud kokoaa asiakkuudenhallinnan, markkinoinnin automaation, verkkosivut ja asiakasviestinnän yhteen alustaan. Kokeile maksutta 14 päivää.',
    'Velar Cloud brings CRM, marketing automation, websites and client communication together in one platform. Start your 14-day free trial.',
  ),
  layout: [
    {
      blockType: 'hero',
      image: media('dashboard'),
      eyebrow: t('Kaikki yhdessä alustassa', 'All-in-one platform'),
      heading: t(
        'Asiakkuudet, markkinointi ja automaatio samassa paikassa',
        'Your CRM, marketing and automation in one place',
      ),
      text: t(
        'Velar Cloud kokoaa CRM:n, markkinoinnin automaation, verkkosivut ja asiakasviestinnän yhteen selkeään alustaan. Vähemmän erillisiä ohjelmia, enemmän aikaa kasvuun.',
        'Velar Cloud brings CRM, marketing automation, websites and client communication together in one simple platform. Fewer tools to juggle, more time to grow.',
      ),
      links: [
        trial(t('Kokeile maksutta 14 päivää', 'Start your 14-day free trial')),
        booking(t('Varaa ilmainen puhelu', 'Book a free call')),
      ],
      // Supplied by Velar Cloud; confirm against the actual trial terms before publishing.
      trustItems: [
        { text: t('Ei sitoutumista', 'No commitment') },
        { text: t('Ei luottokorttia', 'No credit card required') },
        { text: t('Peru milloin vain', 'Cancel anytime') },
      ],
      highlights: [
        { icon: 'gift', text: t('14 päivän ilmainen kokeilu', '14-day free trial') },
        { icon: 'zap', text: t('Nopea ja vaivaton käyttöönotto', 'Quick, easy setup') },
        { icon: 'layers', text: t('Kaikki työkalut yhdessä paikassa', 'Every tool in one place') },
      ],
    },
    {
      blockType: 'logoCloud',
      heading: t('Toimii alan parhaiden työkalujen kanssa', 'Integrates with the best in the industry'),
      items: [
        'Google',
        'Facebook',
        'Instagram',
        'Stripe',
        'PayPal',
        'Shopify',
        'WordPress',
        'Zoom',
        'Slack',
        'Twilio',
        'QuickBooks',
        'OpenAI',
      ].map((name) => ({ name })),
    },
    {
      blockType: 'features',
      anchor: 'features',
      eyebrow: t('Ominaisuudet', 'Features'),
      heading: t('Kaikki tarvittava yrityksesi kasvuun', 'Everything you need to run your business'),
      text: t(
        'Korvaa erilliset ohjelmat yhdellä alustalla, jossa myynti, markkinointi ja viestintä toimivat yhdessä.',
        'Replace scattered tools with one platform where sales, marketing and communication work together.',
      ),
      items: [
        {
          icon: 'crm',
          title: t('Myynti ja asiakkuudenhallinta', 'CRM and sales management'),
          text: t(
            'Seuraa liidejä, asiakkaita ja myyntiputkea yhdestä näkymästä.',
            'Track leads, customers and sales pipelines in one view.',
          ),
          image: media('crmLaptop'),
          brands: ['google', 'quickbooks'],
        },
        {
          icon: 'website',
          title: t('Verkkosivut ja myyntikanavat', 'Website and funnel builder'),
          text: t(
            'Suunnittele ja julkaise ammattimaiset verkkosivut ja myyntisuppilot vaivattomasti.',
            'Design and launch professional websites and sales funnels with ease.',
          ),
          image: media('funnels'),
          brands: ['wordpress', 'shopify'],
        },
        {
          icon: 'automation',
          title: t('Markkinointi ja automaatio', 'Marketing and lead automation'),
          text: t(
            'Automatisoi kampanjat ja liidien hoivaus, niin viestit lähtevät oikeille ihmisille oikeaan aikaan.',
            'Automate campaigns and lead nurturing so the right message reaches the right people at the right time.',
          ),
          image: media('automation'),
          brands: ['google', 'facebook'],
        },
        {
          icon: 'messages',
          title: t('Kaikki viestintä yhdessä paikassa', 'All-in-one communication hub'),
          text: t(
            'Tekstiviestit, sähköpostit ja sosiaalisen median viestit samassa postilaatikossa.',
            'SMS, email and social media messages in a single inbox.',
          ),
          image: media('messages'),
          brands: ['whatsapp', 'messenger', 'instagram'],
        },
        {
          icon: 'social',
          title: t('Sosiaalisen median ajastaminen', 'Social media scheduling'),
          text: t(
            'Suunnittele, ajasta ja julkaise julkaisut kaikkiin kanaviisi kerralla.',
            'Plan, schedule and publish posts across all your channels at once.',
          ),
          image: media('socialPlanning'),
          brands: ['facebook', 'instagram', 'google'],
        },
        {
          icon: 'payments',
          title: t('Ajanvaraukset ja maksut', 'Calendar and payments'),
          text: t(
            'Anna asiakkaiden varata aika itse ja hoida maksut automaattisesti.',
            'Let clients book their own appointments and process payments automatically.',
          ),
          image: media('reports'),
          brands: ['googlecalendar', 'zoom', 'stripe', 'paypal'],
        },
      ],
    },
    {
      blockType: 'benefits',
      anchor: 'benefits',
      eyebrow: t('Miksi Velar Cloud', 'Why Velar Cloud'),
      heading: t('Säästä aikaa tärkeämpiin asioihin', 'Save your time for what matters'),
      text: t(
        'Kun työkalut toimivat yhdessä, arki kevenee ja kasvulle jää enemmän aikaa.',
        'When your tools work together, the day-to-day gets lighter and you have more time to grow.',
      ),
      items: [
        {
          icon: 'layers',
          title: t('Yksi alusta', 'One platform'),
          text: t(
            'Hallinnoi asiakkuuksia, markkinointia ja automaatiota vaivattomasti yhdessä paikassa.',
            'Manage customers, marketing and automation effortlessly in one place.',
          ),
        },
        {
          icon: 'automation',
          title: t('Automaatio hoitaa rutiinit', 'Automation handles the routine'),
          text: t(
            'Anna automaation hoitaa toistuvat tehtävät ja keskity liiketoiminnan kasvuun.',
            'Automate the tasks you would rather not do and focus on growing your business.',
          ),
        },
        {
          icon: 'piggy',
          title: t('Säästöä ohjelmakuluissa', 'Lower software costs'),
          text: t(
            'Yksi tilaus korvaa useita erillisiä ohjelmia, mikä säästää sekä aikaa että rahaa.',
            'One subscription replaces several separate tools, saving both time and money.',
          ),
        },
      ],
    },
    {
      // Heading only: add genuine customer quotes in the admin. The section stays
      // hidden until there is at least one (see src/payload/blocks/Testimonials.ts).
      blockType: 'testimonials',
      anchor: 'testimonials',
      eyebrow: t('Asiakkaat', 'Customers'),
      heading: t('Mitä asiakkaamme sanovat', 'What our customers say'),
      text: t(
        'Kokemuksia yrityksiltä, jotka hoitavat myyntinsä ja markkinointinsa Velar Cloudilla.',
        'Experiences from businesses that run their sales and marketing on Velar Cloud.',
      ),
      items: [],
    },
    ctaSection,
  ],
}

export const pricingPage = {
  slug: t('hinnasto', 'pricing'),
  generateSlug: false,
  title: t('Hinnasto', 'Pricing'),
  description: t(
    'Velar Cloudin paketit ja hinnat. Kaikki paketit alkavat 14 päivän maksuttomalla kokeilulla.',
    'Velar Cloud plans and prices. Every plan starts with a 14-day free trial.',
  ),
  layout: [pricingSection, faqSection, ctaSection],
}

export const contactPage = {
  slug: t('ota-yhteytta', 'contact'),
  generateSlug: false,
  title: t('Ota yhteyttä', 'Contact'),
  description: t(
    'Varaa maksuton puhelu tai ota yhteyttä, niin käydään läpi, miten Velar Cloud voi helpottaa yrityksesi arkea.',
    'Book a free call or get in touch, and we will go through how Velar Cloud can make your business run smoother.',
  ),
  layout: [
    {
      blockType: 'contact',
      eyebrow: t('Yhteystiedot', 'Contact'),
      heading: t('Keskustellaan lisää', "Let's talk"),
      text: t(
        'Varaa maksuton puhelu, niin käydään läpi tavoitteesi, ratkaistaan haasteita ja näytetään, miten Velar Cloud voi helpottaa yrityksesi toimintaa.',
        "Book a free call and we'll go through your goals, solve challenges and show how Velar Cloud can make your business run smoother.",
      ),
      links: [
        booking(t('Varaa maksuton puhelu', 'Book a free call'), 'primary'),
        trial(t('Kokeile maksutta 14 päivää', 'Start your free trial'), 'secondary'),
      ],
      showEmail: true,
      // Paste the GoHighLevel form embed URL in the admin (Sites → Forms → Integrate).
      formTitle: t('Yhteydenottolomake', 'Contact form'),
      formHeight: 760,
      image: media('team'),
    },
    faqSection,
  ],
}

/** Seeded in this order; the home page is "/" and "/en". */
export const pages = [homePage, pricingPage, contactPage]

export const siteSettings = {
  announcement: {
    enabled: true,
    text: t('Kokeile Velar Cloudia maksutta 14 päivää', 'Try Velar Cloud free for 14 days'),
    label: t('Aloita kokeilu', 'Start your trial'),
    kind: 'trial',
  },
  // Same order as the old velarcloud.fi menu. English paths get /en automatically.
  nav: [
    { label: t('Etusivu', 'Home'), href: t('/', '/') },
    { label: t('Blogi', 'Blog'), href: t('/blogi', '/blog') },
    { label: t('Hinnasto', 'Pricing'), href: t('/hinnasto', '/pricing') },
    { label: t('Ota yhteyttä', 'Contact'), href: t('/ota-yhteytta', '/contact') },
  ],
  loginLabel: t('Kirjaudu', 'Log in'),
  loginUrl: 'https://velar.cloud/',
  headerCta: trial(t('Kokeile maksutta', 'Free trial')),
  // The old sites' signup and booking funnels (GoHighLevel). Move them to a
  // subdomain before this site takes over velarcloud.fi / .com, then update here.
  trialUrl: t('https://velarcloud.fi/valitse-palvelu-ratkaisu', 'https://velarcloud.com/choose-your-plan-page'),
  bookingUrl: t('https://velarcloud.fi/varaus-kalenteri', 'https://velarcloud.com/booking-calendar'),
  contactEmail: 'support@velarcloud.com',
  social: [
    { platform: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61571491043564' },
    { platform: 'Instagram', url: 'https://www.instagram.com/velarcloud/' },
    { platform: 'TikTok', url: 'https://www.tiktok.com/@velarcloud' },
  ],
  footerText: t(
    'Tehokas ja automatisoitu asiakkuudenhallinta yrityksesi kasvuun.',
    'The all-in-one CRM for business growth.',
  ),
  legalLinks: [
    {
      label: t('Tietosuojaseloste', 'Privacy policy'),
      url: t('https://velarcloud.fi/tietosuojaseloste', 'https://velarcloud.com/privacypolicy'),
    },
    {
      label: t('Käyttöehdot', 'Terms and conditions'),
      url: t('https://velarcloud.fi/kayttoehdot', 'https://velarcloud.com/terms'),
    },
  ],
}
