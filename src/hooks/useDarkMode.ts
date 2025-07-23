// src/hooks/useDarkMode

import { useState, useEffect } from 'react';

/**
 * Manage dark mode state and apply/remove the `dark` class on `<html>` and `<body>`.
 * - Uses `localStorage` if a preference is stored.
 * - Falls back to system preference if no stored value is found.
 * - Defaults to dark mode if neither is available.
 */
export default function useDarkMode(initial?: boolean): [boolean, (value: boolean) => void] {
  const getInitialDarkMode = (): boolean => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    if (initial !== undefined) return initial;

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)');
    return prefersDark?.matches ?? true; // defaults to dark mode
  };

  const [darkMode, setDarkModeState] = useState(getInitialDarkMode);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (darkMode) {
      html.classList.add('dark');
      body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      body.classList.remove('dark');
    }

    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const setDarkMode = (value: boolean) => {
    setDarkModeState(value);
  };

  return [darkMode, setDarkMode];
}
