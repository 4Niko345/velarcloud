import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { defaultLocale, hasLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getSiteSettings } from '@/lib/settings'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import '../../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

type LayoutArgs = { children: React.ReactNode; params: Promise<{ lang: string }> }

// src/proxy.ts only lets "fi" and "en" through; fall back defensively anyway.
const toLocale = (lang: string) => (hasLocale(lang) ? lang : defaultLocale)

export async function generateMetadata({ params }: Omit<LayoutArgs, 'children'>): Promise<Metadata> {
  const locale = toLocale((await params).lang)
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: { default: 'Velar Cloud', template: '%s | Velar Cloud' },
    description: getDictionary(locale).siteDescription,
  }
}

export default async function FrontendLayout({ children, params }: LayoutArgs) {
  const locale = toLocale((await params).lang)
  const settings = await getSiteSettings(locale)
  const dict = getDictionary(locale)

  return (
    <html lang={locale} className={`${inter.variable} ${poppins.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
        >
          {dict.skipToContent}
        </a>
        <AnnouncementBar locale={locale} settings={settings} />
        <SiteHeader locale={locale} settings={settings} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} settings={settings} dict={dict} />
      </body>
    </html>
  )
}
