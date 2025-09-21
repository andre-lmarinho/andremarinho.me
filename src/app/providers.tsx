'use client';

import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState, type ReactNode } from 'react';

import { defaultSeoConfig } from '@/config/seo';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('darkMode');
    }
  }, []);

  return (
    <>
      {isClient ? <DefaultSeo {...defaultSeoConfig} /> : null}
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
        {children}
      </NextThemesProvider>
    </>
  );
}
