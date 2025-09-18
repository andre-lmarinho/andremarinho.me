import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import './globals.css';
import { SiteLayout } from '@/components/layout';
import cn from '@/utils/cn';
import { AppProviders } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Andre Marinho - Front-End Developer',
  description:
    'Front-End Developer based in Salvador. I craft fast, accessible, and business-driven interfaces with React and TypeScript.',
  metadataBase: new URL('https://andremarinho.vercel.app/'),
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
    title: 'Andre Marinho - Front-End Developer',
    description:
      'Front-End Developer based in Salvador. I craft fast, accessible, and business-driven interfaces with React and TypeScript.',
    url: 'https://andremarinho.vercel.app/',
    siteName: 'Andre Marinho',
    images: [
      {
        url: 'https://github.com/andre-marinho.png',
        alt: 'Andre Marinho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andre Marinho - Front-End Developer',
    description:
      'Front-End Developer based in Salvador. I craft fast, accessible, and business-driven interfaces with React and TypeScript.',
    images: ['https://github.com/andre-marinho.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, 'antialiased')}>
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
        </AppProviders>
      </body>
    </html>
  );
}
