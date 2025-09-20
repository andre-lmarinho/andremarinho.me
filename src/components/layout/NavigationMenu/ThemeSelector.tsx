'use client';

import { useTheme } from '@/context';
import { themeToggle } from '@/utils';
import { Moon, Sun } from 'lucide-react';
import cn from '@/utils/cn';

interface ThemeSelectorProps {
  hidden?: boolean;
}

export default function ThemeSelector({ hidden = false }: ThemeSelectorProps) {
  const { darkMode, setDarkMode } = useTheme();

  const handleToggle = () => {
    themeToggle({ darkMode, setDarkMode });
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'glass group relative p-2 transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent dark:focus-visible:ring-zinc-500',
        hidden && 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100'
      )}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
      type="button"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/70 via-white/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 dark:from-white/15 dark:via-white/5 dark:to-transparent"
      ></span>
      <Moon
        aria-hidden="true"
        className="h-5 w-5 text-zinc-700 transition-all duration-300 group-hover:rotate-12 dark:hidden dark:text-zinc-300"
      />
      <Sun
        aria-hidden="true"
        className="hidden h-5 w-5 text-zinc-100 transition-all duration-300 group-hover:rotate-180 dark:block"
      />
    </button>
  );
}
