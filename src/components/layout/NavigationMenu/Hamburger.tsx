'use client';

import { useEffect, useId } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavigationLink as MenuLinks } from './NavigationLink';
import { cn } from '@/utils/cn';

type Props = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const buttonClassName =
  'inline-flex items-center justify-center rounded-lg p-2 text-zinc-900 transition-colors hover:text-zinc-600 focus-visible:ring-1 focus-visible:ring-neutral-300 dark:text-zinc-100 dark:hover:text-zinc-300 dark:focus-visible:ring-neutral-500';

export function Hamburger({ isOpen, setIsOpen }: Props) {
  const pathname = usePathname();
  const dialogId = useId();
  const labelId = useId();

  // Close the menu immediately when the current page is selected again or an external link opens.
  const handleNavClick = (event: ReactMouseEvent<HTMLElement>) => {
    const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    if (
      anchor.target === '_blank' ||
      href.startsWith('http') ||
      anchor.getAttribute('aria-current') === 'page'
    ) {
      setIsOpen(false);
    }
  };

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
        aria-controls={isOpen ? dialogId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className={cn(buttonClassName, isOpen && 'pointer-events-none opacity-0')}
        type="button"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen && (
        <nav
          className="fixed inset-0 z-50 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          id={dialogId}
          tabIndex={-1}
          onClick={handleNavClick}
        >
          <h2 id={labelId} className="sr-only">
            Mobile navigation menu
          </h2>
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

          <MenuLinks variant="mobile" />
        </nav>
      )}
    </div>
  );
}
