'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

type NavigationLink = {
  text: string;
  href: `/${string}`;
};

const LINKS_BY_VARIANT = {
  desktop: [
    { text: 'Studio', href: '/studio' },
    { text: 'About', href: '/about' },
  ],
  mobile: [
    { text: 'Home', href: '/' },
    { text: 'Studio', href: '/studio' },
    { text: 'About', href: '/about' },
  ],
} as const satisfies Record<string, readonly NavigationLink[]>;

type MenuLinksVariant = keyof typeof LINKS_BY_VARIANT;

const listStyles: Record<MenuLinksVariant, string> = {
  desktop: 'group hidden grid-flow-col gap-6 text-sm font-medium sm:grid',
  mobile: 'flex h-full flex-1 flex-col items-center justify-center space-y-5 text-2xl',
};

type MenuLinksProps = {
  variant?: MenuLinksVariant;
  className?: string;
};

export const NavigationLink = ({ variant = 'desktop', className }: MenuLinksProps) => {
  const pathname = usePathname();
  const normalizedPath = pathname ? `/${pathname.split('/')[1] ?? ''}` : '/';

  const resolvedLinks = LINKS_BY_VARIANT[variant];
  const activeLink = resolvedLinks.find((link) => link.href === normalizedPath);

  return (
    <ul className={cn(listStyles[variant], className)}>
      {resolvedLinks.map(({ href, text }) => {
        const state: 'true' | 'false' | 'indeterminate' = activeLink
          ? activeLink.href === href
            ? 'true'
            : 'false'
          : 'indeterminate';

        return (
          <li key={href}>
            <Link
              href={href}
              className="rounded-xs transition-opacity data-[active=false]:opacity-50 data-[active=false]:hover:opacity-100 data-[active=indeterminate]:hover:opacity-60 data-[active=true]:opacity-100"
              data-active={state}
              aria-current={state === 'true' ? 'page' : undefined}
            >
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
