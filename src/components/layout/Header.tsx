// src/components/layout/Header.tsx

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context';
import { themeToggle } from '@/utils';
import me from '@/assets/images/Me.webp';

export default function Header() {
  const { darkMode, setDarkMode } = useTheme();

  const handleToggle = () => {
    themeToggle({
      darkMode,
      setDarkMode,
    });
  };

  return (
    <header
      id="header"
      className="sticky top-0 z-10 bg-white/80 py-2 backdrop-blur-xl dark:bg-zinc-950/80 sm:py-3"
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
          className="glass group relative order-1 rounded-xl border border-zinc-300/40 p-3 transition-all duration-300 hover:scale-110 hover:border-zinc-500/60 dark:border-zinc-700/40 md:order-2"
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
        >
          {/* Hover background effect */}
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-900/0 to-zinc-600/0 transition-all duration-300 group-hover:from-zinc-900/20 group-hover:to-zinc-600/20"></span>

          {/* Light mode icon */}
          <Moon
            aria-hidden="true"
            className="h-5 w-5 text-zinc-700 transition-all duration-300 group-hover:rotate-12 dark:hidden dark:text-zinc-300"
          />

          {/* Dark mode icon */}
          <Sun
            aria-hidden="true"
            className="hidden h-5 w-5 text-zinc-100 transition-all duration-300 group-hover:rotate-180 dark:block"
          />
        </button>
      </nav>
    </header>
  );
}

