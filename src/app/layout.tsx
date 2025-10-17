import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import { cn } from '@/utils/cn';
import '@/utils/theme.css';

import { Providers } from './providers';

import { NavigationMenu } from '@/components/layout/NavigationMenu';
import { Footer } from '@/components/layout/Footer';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL('https://andremarinho.me'),
  title: {
    absolute: 'André Marinho - Front-End Developer',
    template: 'André Marinho - %s',
  },
  description:
    "I'm a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'André Marinho',
    url: 'https://andremarinho.me',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" />
        <link rel="icon" href="/favicon/icon.png" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        <Providers>
          <NavigationMenu />
          <main id="main" className="page-content">
            {children}
          </main>
          <Footer />
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
