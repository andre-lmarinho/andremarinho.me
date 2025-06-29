import { useState, useEffect } from 'react';

/**
 * Manage dark mode state and apply/remove the `dark` class on `<html>` and `<body>`.
 */
export default function useDarkMode(initial = false): [boolean, (value: boolean) => void] {
  const [darkMode, setDarkMode] = useState(initial);

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
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
