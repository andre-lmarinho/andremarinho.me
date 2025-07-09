// src/components/icons/ExternalLinkIcon.tsx
import React from 'react';

export default function ReactIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-1 h-4 w-4 shrink-0 overflow-visible text-color-01 group-hover:text-[var(--color-accent-1)] group-focus-visible:text-[var(--color-accent-1)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      {/* Square (Fixed) */}
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />

      {/* Arrows (Move Up and Right */}
      <path
        d="M15 3h6v6"
        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      />
      <path
        d="M10 14L21 3"
        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </svg>
  );
}
