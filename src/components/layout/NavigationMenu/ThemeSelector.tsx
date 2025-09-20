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
        'glass group relative rounded-xl p-2 transition-transform duration-300 hover:scale-110',
        hidden && 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100'
      )}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
      type="button"
    >
      <span className="pointer-events-none absolute inset-0 rounded-xl transition-all duration-300"></span>
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
