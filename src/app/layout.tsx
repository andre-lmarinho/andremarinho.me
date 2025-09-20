import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';

import './globals.css';
import { SiteLayout } from '@/components/layout';
import cn from '@/utils/cn';
import { AppProviders } from './providers';

const metaTitle = 'Andre Marinho - Front-End Developer';
const metaDescription =
  'Front-End Developer based in Salvador. I craft fast, accessible, and business-driven interfaces with React and TypeScript.';
const metaImage = '/images/Me.webp';

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter.var.latin.woff2', style: 'normal' },
    { path: '../../public/fonts/inter.var.latin.italic.woff2', style: 'italic' },
  ],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  metadataBase: new URL('https://andremarinho.me/'),
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon/icon.png',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'profile',
    title: metaTitle,
    description: metaDescription,
    url: 'https://andremarinho.me/',
    siteName: 'Andre Marinho',
    images: [
      {
        url: metaImage,
        alt: 'Andre Marinho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    images: [metaImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
