'use client';

import TextType from './components/TextType';
import ScrollCopy from './components/ScrollCopy';
import HomeProjects from '../home/components/Projects';
import type React from 'react';
import { useState, useRef } from 'react';

function Hero() {
  return (
    <section id="hero" className="pb-20 pt-16 md:pb-28 md:pt-24">
      <h1 className="pb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        {'World-class '}
        <TextType
          as="span"
          className="italic text-zinc-900 dark:text-zinc-100"
          text={['design', 'software', 'product']}
        />
        <span className="block">partner for your business</span>
      </h1>
      <p className="max-w-lg pb-14 text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400 sm:max-w-2xl sm:text-3xl">
        We help business build high-quality products and delightful digital experiences.
      </p>

      <a
        href="https://wa.me/5571984770061"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-2 font-semibold text-white antialiased shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.97]"
      >
        Book a call
      </a>
    </section>
  );
}

function Copy() {
  return (
    <section
      id="copy"
      className="prose prose-zinc dark:prose-invert whitespace-pre-wrap text-xl font-semibold text-zinc-700 dark:text-zinc-300 sm:text-2xl"
    >
      <ScrollCopy className="space-y-8" />
    </section>
  );
}

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features?: string[];
}

function PricingCard({ tier, price, description, features = [] }: PricingCardProps) {
  return (
    <div className={`relative rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800`}>
      <h3 className="text-lg font-semibold">{tier}</h3>
      <p className="mb-6 mt-4 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">Starting at</p>
      <p className="mb-6 flex items-baseline gap-1 text-zinc-900 dark:text-zinc-100">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-zinc-500 dark:text-zinc-400">/ one-time</span>}
      </p>
      <a
        href="https://wa.me/5571984770061"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-lg bg-gradient-to-b from-orange-500 to-orange-600 py-2 text-center font-semibold text-white antialiased shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.97]"
      >
        Start a project
      </a>
      <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 fill-orange-500"
            >
              <path
                fillRule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="bg-brand mt-1 inline-block h-1.5 w-1.5 rounded-full" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing">
      <div className="mb-6 mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PricingCard
          tier="Website"
          price="$ 1.000"
          description="For companies that want a new approach on their website."
          features={['Landing page', 'UI/UX Design', 'Front-end development']}
        />
        <PricingCard
          tier="Growth"
          price="$ 3.000"
          description="For early-stage companies aiming to transform their idea into a product."
          features={['End-to-end MVP', 'Product design', 'Full-stack development']}
        />
      </div>
      <div className="flex flex-col gap-x-20 rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Custom</h3>
          <p className="mb-8 mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            If your needs don&apos;t fit any of our packages, we can work something out. Let&apos;s
            chat and see how we can help you.
          </p>
        </div>
        <a
          href="https://wa.me/5571984770061"
          target="_blank"
          rel="noopener noreferrer"
          className="shadow-xs inline-flex items-center justify-center gap-x-1.5 rounded-lg border border-zinc-200 px-6 py-2 text-sm font-semibold antialiased transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-[.99] dark:border-zinc-800 dark:bg-neutral-900 dark:focus-visible:outline-neutral-500"
        >
          Book a call
        </a>
      </div>
    </section>
  );
}

function FinalCTA() {
  const email = 'hey@andremarinho.me';
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);
  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!navigator?.clipboard?.writeText) {
      setCopied(false);
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setCopied(false), 3600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section id="contact">
      <div className="rounded-3xl bg-zinc-50 p-10 dark:bg-zinc-900/50 sm:p-16">
        <h2 className="text-3xl font-semibold md:text-4xl">Your duonorth starts here</h2>
        <p className="max-w-sm pb-8 pt-6 text-lg font-medium text-zinc-700 dark:text-zinc-300">
          We&apos;ve got you &mdash; Schedule a call or email at{' '}
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
          </button>{' '}
          to see if we&apos;re a match.
        </p>

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
}

export default function App() {
  return (
    <>
      <Hero />
      <HomeProjects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
