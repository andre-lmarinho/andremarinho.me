// src/components/layout/Footer

import React from 'react';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="max-w-md pb-16 text-sm text-color-02 sm:pb-0 transition-colors duration-500"
    >
      <p>
        From{' '}
        <a
          href="https://www.figma.com/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Figma (opens in a new tab)"
        >
          Figma
        </a>{' '}
        to{' '}
        <a
          href="https://react.dev/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="React (opens in a new tab)"
        >
          React
        </a>
        , through{' '}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Tailwind CSS (opens in a new tab)"
        >
          Tailwind
        </a>{' '}
        and{' '}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="VS Code (opens in a new tab)"
        >
          VS Code
        </a>{' '}
        — now flying on{' '}
        <a
          href="https://vercel.com/"
          className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vercel (opens in a new tab)"
        >
          Vercel
        </a>
        .
      </p>
    </footer>
  );
}
