import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';

import './globals.css';
import Layout from '@/components/layout';
import cn from '@/utils';
import { Providers } from './providers';

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter.var.latin.woff2', style: 'normal' },
    { path: '../../public/fonts/inter.var.latin.italic.woff2', style: 'italic' },
  ],
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    absolute: 'Andre Marinho - Front-End Developer',
    template: 'Andre Marinho - %s',
  },
  description:
    'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.',
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
    type: 'website',
    url: 'https://andremarinho.me/',
    siteName: 'Andre Marinho',
    images: [
      {
        url: '/images/me.webp',
        alt: 'Andre Marinho',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, 'font-sans antialiased')}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
