import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import '@/utils/theme.css';

import Layout from '@/components/layout';
import cn from '@/utils/cn';
import {
  defaultDescription,
  defaultTitle,
  siteName,
  siteUrl,
  titleTemplate,
} from '@/config/metadata';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    absolute: defaultTitle,
    template: titleTemplate,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    locale: 'en-US',
    siteName,
    url: siteUrl,
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
          <Layout>{children}</Layout>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
