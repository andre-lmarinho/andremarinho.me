'use client';

import { Moon, Sun } from 'lucide-react';

import cn from '@/utils';

interface ThemeSelectorProps {
  hidden?: boolean;
}

export default function ThemeSelector({ hidden = false }: ThemeSelectorProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        hidden && 'pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100'
      )}
    >
      <input
        id="dark-mode-toggle"
        type="checkbox"
        className="peer sr-only"
        aria-label="Toggle dark mode"
      />
      <label
        htmlFor="dark-mode-toggle"
        className="group relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-transparent bg-zinc-100/60 p-2 text-zinc-700 transition-colors transition-transform duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-zinc-400 hover:scale-110 hover:bg-zinc-100 focus-visible:outline-none dark:bg-zinc-800/60 dark:text-zinc-200 dark:peer-focus-visible:outline-zinc-600 dark:hover:bg-zinc-800"
        title="Toggle dark mode"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Moon
            aria-hidden="true"
            className="absolute h-5 w-5 text-zinc-700 opacity-100 transition-all duration-300 group-hover:rotate-12 peer-checked:scale-75 peer-checked:-rotate-90 peer-checked:opacity-0 dark:text-zinc-300"
          />
          <Sun
            aria-hidden="true"
            className="absolute h-5 w-5 text-zinc-100 opacity-0 transition-all duration-300 group-hover:rotate-180 peer-checked:scale-100 peer-checked:rotate-0 peer-checked:opacity-100"
          />
        </span>
      </label>
    </div>
  );
}
