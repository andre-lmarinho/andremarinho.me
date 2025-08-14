// src/components/layout/Header.tsx

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme, useMotion } from '@/context';
import { themeToggle } from '@/utils';
import me from '@/assets/images/Me.jpg';

export default function Header() {
  const { darkMode, setDarkMode } = useTheme();
  const { shouldReduceMotion } = useMotion();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    themeToggle({
      button: e.currentTarget,
      darkMode,
      setDarkMode,
      shouldReduceMotion,
    });
  };

  return (
    <header
      id="header"
      className="sticky top-0 z-10 bg-white/75 py-2 backdrop-blur-xl dark:bg-gray-900/75 sm:py-3"
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 font-semibold sm:px-4">
        <a
          className="grid grid-flow-col items-center overflow-hidden rounded-full"
          href="/"
          aria-label="Visit André Marinho's website"
        >
          <img
            alt="André Marinho"
            loading="lazy"
            width={32}
            height={32}
            decoding="async"
            className="rounded-full"
            src={me}
          />
        </a>
        <button
          onClick={handleToggle}
          className="glass group relative order-1 rounded-xl border border-gray-300/30 p-3 transition-all duration-300 hover:scale-110 hover:border-primary-500/50 dark:border-gray-600/30 md:order-2"
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
        >
          {/* Hover background effect */}
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-secondary-500/0 transition-all duration-300 group-hover:from-primary-500/20 group-hover:to-secondary-500/20"></span>

          {/* Light mode icon */}
          <Moon
            aria-hidden="true"
            className="h-5 w-5 text-slate-700 transition-all duration-300 group-hover:rotate-12 dark:hidden dark:text-slate-300"
          />

          {/* Dark mode icon */}
          <Sun
            aria-hidden="true"
            className="hidden h-5 w-5 text-amber-500 transition-all duration-300 group-hover:rotate-180 dark:block"
          />
        </button>
      </nav>
    </header>
  );
}
