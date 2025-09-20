'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context';
import { themeToggle } from '@/utils';
import { Moon, Sun } from 'lucide-react';
import cn from '@/utils/cn';

interface ThemeSelectorProps {
  hidden?: boolean;
}

export default function ThemeSelector({ hidden = false }: ThemeSelectorProps) {
  const { darkMode, setDarkMode } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    themeToggle({ darkMode, setDarkMode });
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'group relative rounded-xl border-none bg-transparent p-2 transition-transform duration-300 hover:scale-110',
        hidden && 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100'
      )}
      aria-label="Toggle dark mode"
      aria-pressed={isMounted ? darkMode : undefined}
      type="button"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        <Moon
          aria-hidden="true"
          className="absolute inset-0 h-5 w-5 shrink-0 text-zinc-700 opacity-100 transition-all duration-300 group-hover:rotate-12 dark:text-zinc-300 dark:opacity-0"
        />
        <Sun
          aria-hidden="true"
          className="absolute inset-0 h-5 w-5 shrink-0 text-zinc-100 opacity-0 transition-all duration-300 group-hover:rotate-180 dark:opacity-100"
        />
      </span>
    </button>
  );
}
