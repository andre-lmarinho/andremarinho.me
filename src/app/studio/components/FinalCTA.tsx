'use client';

import { LinkButton } from '@/app/studio/components/ui/LinkButton';

export const FinalCTA = () => {
  const email = 'hey@andremarinho.me';

  async function handleCopy() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      }
    } catch {
      // opcional: logar erro
    }
  }

  return (
    <section id="contact">
      <div className="rounded-3xl bg-zinc-50 p-10 sm:p-16 dark:bg-zinc-900/50 dark:shadow-[inset_0px_1px_0px_rgb(255_255_255_/_0.04),_inset_0px_0px_0px_0.5px_rgb(255_255_255_/_0.02),_0px_1px_2px_rgb(0_0_0_/_0.4),_0px_2px_4px_rgb(0_0_0_/_0.08),_0px_0px_0px_0.5px_rgb(0_0_0_/_0.24)]">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your duonorth starts here</h2>

        <p className="mt-6 mb-8 max-w-sm text-lg font-medium text-zinc-700 dark:text-zinc-300">
          We&apos;ve got you. Schedule a call or email at{' '}
          <button
            type="button"
            onClick={() => void handleCopy()}
            aria-label="Copy email to clipboard"
            title="Click to copy email"
            className="relative m-0 inline-flex translate-y-[2px] cursor-pointer items-center bg-transparent p-0 align-baseline text-lg font-medium text-zinc-700 after:absolute after:-inset-[2px] after:rounded-lg after:border after:border-orange-500 after:opacity-0 after:ring-2 after:ring-orange-500/20 after:transition-opacity hover:text-neutral-900 focus-visible:outline-none focus-visible:after:opacity-100 active:text-orange-500 dark:text-zinc-300 dark:hover:text-white dark:active:text-orange-400"
          >
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
            {email}
          </button>{' '}
          to see if we&apos;re a match.
        </p>

        <LinkButton>Get started</LinkButton>
      </div>
    </section>
  );
};
