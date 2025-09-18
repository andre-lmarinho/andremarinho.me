'use client';

import { useEffect, useState } from 'react';

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

      return window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    }

    return initial ?? false;
  };

  const [darkMode, setDarkModeState] = useState(getInitialDarkMode);

  useEffect(() => {
    if (!isBrowser) return;

    const html = document.documentElement;
    const body = document.body;

    let mediaQuery: MediaQueryList | undefined;
    const handleChange = (event: MediaQueryListEvent) => {
      setDarkModeState(event.matches);
    };

    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleChange);
    }

    const colorScheme = darkMode ? 'dark' : 'light';

    html.classList.toggle('dark', darkMode);
    body.classList.toggle('dark', darkMode);
    html.style.colorScheme = colorScheme;
    body.style.colorScheme = colorScheme;

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
