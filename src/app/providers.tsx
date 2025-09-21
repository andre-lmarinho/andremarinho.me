'use client';

import { useEffect, type ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('darkMode');
    }
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      {children}
    </NextThemesProvider>
  );
}
