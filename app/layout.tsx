import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import {
  appName,
  author,
  description,
  githubUrl,
  keywords,
  siteUrl,
  tagline,
  twitterHandle,
} from '@/lib/shared';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} — ${tagline}`,
    template: `%s · ${appName}`,
  },
  description,
  applicationName: appName,
  keywords: [...keywords],
  authors: [{ name: author, url: 'https://github.com/educlopez' }],
  creator: author,
  publisher: author,
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      es: '/es',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: appName,
    title: `${appName} — ${tagline}`,
    description,
    url: siteUrl,
    locale: 'en_US',
    alternateLocale: ['es_ES'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${appName} — ${tagline}`,
    description,
    creator: twitterHandle,
    site: twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'github:repo': githubUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#15a8a3' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f10' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
