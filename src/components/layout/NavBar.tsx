//src/components/layouts/NavBar

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function NavBar({ darkMode, setDarkMode }: NavbarProps) {
  return (
    <div className="fixed">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="relative p-3 glass rounded-xl border border-gray-300/30 dark:border-gray-600/30 hover:border-primary-500/50 transition-all duration-300 group hover:scale-110 order-1 md:order-2"
        aria-label="Toggle dark mode"
      >
        {/* Hover background effect */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300 pointer-events-none"></span>

        {/* Light mode icon */}
        <Moon className="w-5 h-5 text-slate-700 dark:text-slate-300 dark:hidden transition-all duration-300 group-hover:rotate-12" />

        {/* Dark mode icon */}
        <Sun className="w-5 h-5 text-amber-500 hidden dark:block transition-all duration-300 group-hover:rotate-180" />
      </button>
    </div>
  );
}
