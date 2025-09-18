'use client';

import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { RemoveScroll } from 'react-remove-scroll';
import { usePathname } from 'next/navigation';

import cn from '@/utils/cn';

import Links, { type NavLink } from './Links';

type HamburgerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  links: NavLink[];
};

const buttonClassName =
  'rounded-lg p-2 text-zinc-900 transition-colors hover:text-zinc-600 focus-visible:outline-hidden focus:ring-1 focus:ring-neutral-300 dark:text-zinc-100 dark:hover:text-zinc-300 dark:focus:ring-neutral-500';

export default function Hamburger({ isOpen, setIsOpen, links }: HamburgerProps) {
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      <button
        aria-label="Open navigation menu"
        onClick={() => setIsOpen(true)}
        className={cn(buttonClassName, isOpen && 'pointer-events-none opacity-0')}
        type="button"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen && (
        <RemoveScroll>
          <nav className="fixed inset-0 z-50 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
            <div className="absolute right-0 px-6 py-2">
              <button
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
                className={buttonClassName}
                type="button"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Links links={links} variant="mobile" onSelect={() => setIsOpen(false)} />
          </nav>
        </RemoveScroll>
      )}
    </div>
  );
}
