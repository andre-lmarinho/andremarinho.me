import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

import './globals.css';
import { AppProviders } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Andre Marinho - Front-End Developer',
  description:
    'Front-End Developer based in Salvador. I craft fast, accessible, and business-driven interfaces with React and TypeScript.',
  metadataBase: new URL('https://andremarinho.vercel.app/'),
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
      <body className={`${inter.variable} bg-white text-zinc-900 antialiased dark:bg-zinc-950`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
