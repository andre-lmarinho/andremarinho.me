import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

import { contactLinks } from '@/data';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

export default function Footer() {
  return (
    <footer id="footer" className="mx-auto max-w-4xl px-6 pt-8 text-sm sm:px-4">
      <div className="flex items-center justify-between py-6 text-sm">
        <p className="text-zinc-600 dark:text-zinc-400">Andre Marinho &copy; 2025</p>
        <ul
          className="ml-1 flex items-center text-zinc-600 dark:text-zinc-400"
          aria-label="Online profiles"
        >
          {contactLinks.map((link) => {
            const Icon = link.icon ? iconMap[link.icon] : undefined;
            const isExternal = link.href.startsWith('http');

            return (
              <li
                key={link.href}
                className="mr-5 shrink-0 transform text-xs transition-colors last:mr-0 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <a
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="relative block"
                  aria-label={link.ariaLabel}
                  title={link.label}
                >
                  <span className="sr-only">{link.label}</span>
                  {Icon ? <Icon aria-hidden="true" className="h-5 w-5" /> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
