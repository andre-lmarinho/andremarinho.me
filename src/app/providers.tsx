'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, type ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    window.localStorage.removeItem('darkMode');
  }, []);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
      {children}
    </NextThemesProvider>
  );
}
