'use client';

import { useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import cn from '@/utils/cn';

import Links, { type NavLink } from './Links';

const focusableSelector =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

type HamburgerProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  links: NavLink[];
};

const buttonClassName =
  'glass flex h-11 w-11 items-center justify-center rounded-xl text-zinc-900 transition-colors hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent dark:text-zinc-100 dark:hover:text-zinc-300 dark:focus-visible:ring-zinc-500';

export default function Hamburger({ isOpen, setIsOpen, links }: HamburgerProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      openButtonRef.current?.focus();
      return;
    }

    const navElement = navRef.current;

    if (!navElement) {
      return;
    }

    const getFocusableElements = () =>
      Array.from(navElement.querySelectorAll<HTMLElement>(focusableSelector));

    const focusFirstElement = () => {
      const [firstElement] = getFocusableElements();
      (firstElement ?? navElement).focus();
    };

    const frameId = requestAnimationFrame(focusFirstElement);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        navElement.focus();
        return;
      }

      const [firstElement] = focusableElements;
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;
      const isFocusInside = activeElement ? navElement.contains(activeElement) : false;

      if (event.shiftKey) {
        if (!isFocusInside || activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (!isFocusInside || activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="sm:hidden">
      <button
        aria-label="Open navigation menu"
        onClick={() => setIsOpen(true)}
        className={cn(buttonClassName, isOpen && 'pointer-events-none opacity-0')}
        type="button"
        ref={openButtonRef}
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {isOpen && (
        <nav
          ref={navRef}
          className="fixed inset-0 z-50 flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className="absolute right-0 top-0 px-6 py-2">
            <button
              aria-label="Close navigation menu"
              onClick={() => setIsOpen(false)}
              className={buttonClassName}
              type="button"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Links links={links} variant="mobile" />
        </nav>
      )}
    </div>
  );
}
