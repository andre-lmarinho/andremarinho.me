'use client';

import type React from 'react';
import { useRef, useState } from 'react';

const FinalCTA = () => {
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
      <div className="rounded-3xl bg-zinc-50 p-10 dark:bg-zinc-900/50 sm:p-16">
        <h2 className="text-3xl font-semibold md:text-4xl">Your duonorth starts here</h2>
        <div className="max-w-sm pb-8 pt-6 text-lg font-medium text-zinc-700 dark:text-zinc-300">
          <p className="mb-2">We&apos;ve got you &mdash; Schedule a call or email at</p>
          <div className="flex flex-wrap items-baseline gap-1">
            <button
              onClick={handleCopy}
              className={`group relative inline-flex cursor-pointer items-center align-baseline underline-offset-4 transition-colors after:pointer-events-none after:absolute after:-inset-[2px] after:rounded-lg after:border after:border-orange-500 after:opacity-0 after:ring-2 after:ring-orange-500/20 after:transition-opacity hover:underline ${
                copied
                  ? 'text-orange-500 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-400'
                  : 'hover:text-neutral-900 dark:hover:text-white'
              }`}
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
            </button>
            <span>to see if we&apos;re a match.</span>
          </div>
        </div>

        <a
          href="https://wa.me/5571984770061"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-2 font-semibold text-white antialiased shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.97]"
        >
          Get started
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
