import React from 'react';

import type { ContactLink } from '@/data';
import { contactLinks } from '@/data';

export default function Online() {
  return (
    <section id="online">
      <h2>Online</h2>
      <div className="flex flex-wrap gap-3">
        {contactLinks.map((link: ContactLink) => {
          const isExternal = link.href.startsWith('http');
          return (
            <a
              key={link.href}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-900"
              aria-label={link.ariaLabel}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </section>
  );
}
