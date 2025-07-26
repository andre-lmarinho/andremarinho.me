// src/components/layout/NavBar

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context';

export default function NavBar() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <div className="fixed right-4 top-4 z-50">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="glass group relative order-1 rounded-xl border border-gray-300/30 p-3 transition-all duration-300 hover:scale-110 hover:border-primary-500/50 dark:border-gray-600/30 md:order-2"
        aria-label="Toggle dark mode"
        aria-pressed={darkMode}
      >
        {/* Hover background effect */}
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-secondary-500/0 transition-all duration-300 group-hover:from-primary-500/20 group-hover:to-secondary-500/20"></span>

        {/* Light mode icon */}
        <Moon className="h-5 w-5 text-slate-700 transition-all duration-300 group-hover:rotate-12 dark:hidden dark:text-slate-300" />

        {/* Dark mode icon */}
        <Sun className="hidden h-5 w-5 text-amber-500 transition-all duration-300 group-hover:rotate-180 dark:block" />
      </button>
    </div>
  );
}
