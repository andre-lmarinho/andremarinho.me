'use client';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export type NavLink = { href: `/${string}` | `https://${string}`; text: string };
type LinksProps = { links: NavLink[]; variant: 'desktop' | 'mobile'; onSelect?: () => void };

const STYLES = {
  desktop: {
    list: 'hidden grid-flow-col list-none gap-6 text-sm font-medium sm:grid group',
    link: 'no-underline transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-400',
    active: 'opacity-100',
    inactive: 'opacity-50 hover:opacity-100',
    indeterminate: 'hover:opacity-60',
  },
  mobile: {
    list: 'm-0 flex h-full flex-1 flex-col items-center justify-center space-y-5 text-2xl list-none',
    link: 'text-3xl font-semibold no-underline transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-400',
    active: 'opacity-100',
    inactive: 'opacity-50 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100',
  },
} as const;

export default function Links({ links, variant, onSelect }: LinksProps) {
  const pathname = usePathname();
  const activePath = `/${pathname?.split('/')[1] ?? ''}`;
  const styles = STYLES[variant];
  const indeterminate = variant === 'desktop' && !links.some(({ href }) => href === activePath);
  const handleSelect = onSelect ? () => onSelect() : undefined;

  return (
    <ul className={styles.list}>
      {links.map(({ href, text }) => {
        const isActive = href === activePath;
        const stateClass = styles[isActive ? 'active' : 'inactive'];
        const className = `${styles.link} ${stateClass}${indeterminate ? ` ${STYLES.desktop.indeterminate}` : ''}`;

        return (
          <li key={href}>
            {!href.startsWith('/') ? (
              <a
                className={className}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
                onClick={handleSelect}
              >
                {text}
              </a>
            ) : (
              <NextLink
                href={href}
                className={className}
                aria-current={isActive ? 'page' : undefined}
                onClick={handleSelect}
              >
                {text}
              </NextLink>
            )}
          </li>
        );
      })}
    </ul>
  );
}
