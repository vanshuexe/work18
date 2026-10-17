import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { site } from '../lib/site';
import './globals.css';

const body = Barlow({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Bicycle & agriculture parts manufacturer, Ludhiana`, template: `%s | ${site.name}` },
  description:
    'Harison Cycle Industries manufactures bicycle carriers, stands and accessories, and agriculture parts for combines, reapers and balers, from wire, tube and sheet metal in Ludhiana, India. Engineering goods since 1964.',
  openGraph: { type: 'website', siteName: site.name, locale: 'en_IN' },
  icons: { icon: '/images/brand/favicon.png', apple: '/images/brand/apple-touch-icon.png' },
};

export const viewport = { themeColor: '#0c1a2a' };

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  foundingDate: String(site.founded),
  email: site.email,
  telephone: '+91-99888-55011',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3484, St. No. 6, New Janta Nagar',
    addressLocality: 'Ludhiana',
    addressRegion: 'Punjab',
    postalCode: '141003',
    addressCountry: 'IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}
