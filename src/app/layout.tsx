import localFont from 'next/font/local';
import React from 'react';

import './globals.css';
import Layout from '@/components/layout';
import cn from '@/utils';
import { defaultMetadata } from '@/config/seo';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = defaultMetadata;

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter.var.latin.woff2', style: 'normal' },
    { path: '../../public/fonts/inter.var.latin.italic.woff2', style: 'italic' },
  ],
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
