'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import cn from '@/utils/cn';

type NavigationLink = {
  text: string;
  href: `/${string}`;
};

const MENU_LINKS: NavigationLink[] = [
  { text: 'Home', href: '/' },
  { text: 'Studio', href: '/studio' },
  { text: 'About', href: '/about' },
];

const listStyles = {
  desktop: 'group hidden grid-flow-col gap-6 text-sm font-medium sm:grid',
  mobile: 'flex h-full flex-1 flex-col items-center justify-center space-y-5 text-2xl',
  notFound: 'mt-4 list-inside list-disc space-y-2 px-4 text-lg',
} as const;

const anchorStyles = {
  desktop:
    'transition-opacity data-[active=indeterminate]:hover:opacity-60 data-[active=true]:opacity-100 data-[active=false]:opacity-50 data-[active=false]:hover:opacity-100',
  mobile:
    'transition-opacity data-[active=indeterminate]:hover:opacity-60 data-[active=true]:opacity-100 data-[active=false]:opacity-50 data-[active=false]:hover:opacity-100',
  notFound:
    'underline underline-offset-2 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100',
} as const;

type MenuLinksVariant = keyof typeof listStyles;

type MenuLinksProps = {
  variant?: MenuLinksVariant;
  className?: string;
};

const normalizePathname = (pathname: string | null) => {
  if (!pathname) {
    return '/';
  }

  const [, firstSegment] = pathname.split('/');
  return `/${firstSegment ?? ''}`;
};

const MenuLinks = ({ variant = 'desktop', className }: MenuLinksProps) => {
  const pathname = usePathname();
  const normalizedPath = normalizePathname(pathname);

  const resolvedLinks =
    variant === 'desktop' ? MENU_LINKS.filter(({ href }) => href !== '/') : MENU_LINKS;

  const showActiveState = variant !== 'notFound';
  const isIndeterminate = showActiveState
    ? resolvedLinks.every((link) => link.href !== normalizedPath)
    : false;

  return (
    <ul className={cn(listStyles[variant], className)}>
      {resolvedLinks.map(({ href, text }) => {
        const isActive = showActiveState && href === normalizedPath;
        const state: 'true' | 'false' | 'indeterminate' | undefined = showActiveState
          ? isIndeterminate
            ? 'indeterminate'
            : isActive
              ? 'true'
              : 'false'
          : undefined;

        return (
          <li key={href}>
            <Link
              href={href}
              className={anchorStyles[variant]}
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

export type { MenuLinksVariant };
export default MenuLinks;
