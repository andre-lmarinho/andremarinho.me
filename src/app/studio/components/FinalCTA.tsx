'use client';

import type React from 'react';
import { useRef, useState } from 'react';

import { Button } from '@/app/studio/components/CTAButton';
import { cn } from '@/utils/cn';

export const FinalCTA = () => {
  const email = 'hey@andremarinho.me';
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!navigator?.clipboard?.writeText) {
      setCopied(false);
      return;
    }

    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => setCopied(false), 3600);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  return (
    <section id="contact">
      <div className="rounded-3xl bg-zinc-50 p-10 sm:p-16 dark:bg-zinc-900/50 dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_0.5px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]">
        <h2 className="inline-block text-3xl font-semibold md:text-4xl">
          Your duonorth starts here
        </h2>
        <p className="mt-6 mb-8 max-w-sm text-lg font-medium text-zinc-700 dark:text-zinc-300">
          We&apos;ve got you &mdash; Schedule a call or email at
          <span
            role="button"
            tabIndex={0}
            onClick={handleCopy}
            className={cn(
              'group relative inline-flex cursor-pointer appearance-none items-center p-0 text-left align-baseline text-lg font-medium text-zinc-700 underline-offset-4 transition-colors after:pointer-events-none after:absolute after:-inset-[2px] after:rounded-lg after:border after:border-orange-500 after:opacity-0 after:ring-2 after:ring-orange-500/20 after:transition-opacity hover:underline focus-visible:outline-none focus-visible:after:opacity-100 dark:text-zinc-300',
              copied
                ? 'text-orange-500 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-400'
                : 'hover:text-neutral-900 dark:hover:text-white'
            )}
            title={copied ? 'Copied!' : 'Click to copy email'}
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="mr-1 h-4 w-4"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="mr-1 h-4 w-4"
                aria-hidden
              >
                <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h6A1.5 1.5 0 0 1 14 6.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 5 12.5v-6Z" />
                <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11V6.5a3 3 0 0 1 3-3H11A1.5 1.5 0 0 0 9.5 2h-6Z" />
              </svg>
            )}
            {email}
          </span>{' '}
          to see if we&apos;re a match.
        </p>

        <Button>Get started</Button>
      </div>
    </section>
  );
};
