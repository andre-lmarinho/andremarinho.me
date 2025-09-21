'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationLinks, type NavigationLink } from '@/data';

type Props = {
  links?: NavigationLink[];
  isHamburguer?: boolean;
};

const Links = ({ links = navigationLinks, isHamburguer }: Props) => {
  const pathname = `/${usePathname()?.split('/')[1] ?? ''}`;
  const isIndeterminate = links.every((l) => l.href !== pathname);

  return (
    <ul
      className={
        isHamburguer
          ? 'm-0 flex h-full flex-1 list-none flex-col items-center justify-center space-y-5 text-2xl'
          : 'group hidden list-none grid-flow-col gap-6 text-sm font-medium sm:grid'
      }
    >
      {links.map(({ href, text }) => {
        const external = href.startsWith('http');
        const isActive = !external && href === pathname;
        const state = isIndeterminate
          ? 'hover:opacity-60'
          : isActive
            ? 'opacity-100'
            : 'opacity-50 hover:opacity-100';
        const className = `transition-opacity ${state}`;

        return (
          <li key={href}>
            {external ? (
              <a href={href} className={className} target="_blank" rel="noopener noreferrer">
                {text}
              </a>
            ) : (
              <NextLink
                href={href}
                className={className}
                aria-current={isActive ? 'page' : undefined}
              >
                {text}
              </NextLink>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Links;
