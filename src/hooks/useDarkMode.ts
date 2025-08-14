// src/hooks/useDarkMode.ts

import { useState, useEffect } from 'react';

/**
 * Manage dark mode state and apply/remove the `dark` class on `<html>` and `<body>`.
 * - Uses `localStorage` if a preference is stored.
 * - Falls back to system preference if no stored value is found.
 * - Defaults to dark mode if neither is available.
 */
export default function useDarkMode(initial?: boolean): [boolean, (value: boolean) => void] {
  const isBrowser = typeof window !== 'undefined';

  const getInitialDarkMode = (): boolean => {
    if (isBrowser) {
      const stored = window.localStorage.getItem('darkMode');
      if (stored !== null) return stored === 'true';
      if (initial !== undefined) return initial;

      const prefersDark =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-color-scheme: dark)')
          : undefined;
      return prefersDark?.matches ?? true; // defaults to dark mode
    }

    return initial ?? true; // safe fallback outside the browser
  };

  const [darkMode, setDarkModeState] = useState(getInitialDarkMode);

  useEffect(() => {
    if (!isBrowser) return;

    const mediaQuery =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)')
        : null;
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkModeState(event.matches);
    };
    mediaQuery?.addEventListener('change', handleChange);

    const html = document.documentElement;
    const body = document.body;

    if (darkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }

    window.localStorage.setItem('darkMode', String(darkMode));

    return () => {
      mediaQuery?.removeEventListener('change', handleChange);
    };
  }, [darkMode, isBrowser]);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
  };

  return [darkMode, setDarkMode];
}
