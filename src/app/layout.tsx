import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import React from 'react';

import { cn } from '@/utils/cn';
import '@/utils/theme.css';

import { Layout } from '@/components/Layout';
import { SITE_NAME, SITE_URL } from '@/configs/site';
import Providers from './providers';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: `${SITE_NAME} - Front-End Engineer`,
    template: `${SITE_NAME} - %s`,
  },
  description:
    "I'm a Front-End Engineer based in Salvador. I create digital experiences that connect design, strategy and business growth.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400', '700'],
  display: 'swap',
});

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  void import('../mocks');
}

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
      <body className={cn(inter.variable, robotoMono.variable, 'font-sans antialiased')}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
