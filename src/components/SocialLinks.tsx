import { Github, Linkedin, Mail } from 'lucide-react';

import { SOCIAL_LINKS } from '@/config/social';
import { cn } from '@/utils/cn';

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
} as const;

const listStyles = {
  footer: 'flex items-center gap-0',
  about: 'flex flex-wrap items-center gap-3',
} as const;

const linkStyles = {
  footer:
    'inline-flex rounded-xl items-center justify-center p-3 text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
  about:
    'flex items-center justify-center rounded-full border border-zinc-200 px-5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-900',
} as const;

type SocialLinksVariant = keyof typeof listStyles;

type SocialLinksProps = {
  variant?: SocialLinksVariant;
  className?: string;
};

export const SocialLinks = ({ variant = 'footer', className }: SocialLinksProps) => (
  <ul className={cn(listStyles[variant], className)}>
    {SOCIAL_LINKS.map(({ href, label, ariaLabel, icon }) => {
      const Icon = icon ? ICONS[icon] : undefined;

      return (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            title={variant === 'footer' ? label : undefined}
            className={cn(linkStyles[variant])}
          >
            {variant === 'footer' && Icon ? (
              <>
                <Icon aria-hidden className="h-5 w-5" />
                <span className="sr-only">{label}</span>
              </>
            ) : (
              label
            )}
          </a>
        </li>
      );
    })}
  </ul>
);
