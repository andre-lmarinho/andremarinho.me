'use client';

import { usePathname } from 'next/navigation';

import LinkComponent, { type NavLink } from './Links/Link';

type Variant = 'desktop' | 'mobile';

type LinksProps = {
  links: NavLink[];
  variant: Variant;
  onSelect?: () => void;
};

export default function Links({ links, variant, onSelect }: LinksProps) {
  const pathname = usePathname();
  const currentRoot = `/${pathname?.split('/')[1] ?? ''}`;
  const activePath = currentRoot === '//' || currentRoot === '/' ? '/' : currentRoot;

  const isIndeterminate = links.every((link) => link.href !== activePath);

  const listClassName =
    variant === 'mobile'
      ? 'm-0 flex h-full flex-1 flex-col items-center justify-center space-y-5 text-2xl'
      : 'hidden grid-flow-col gap-6 text-sm font-medium sm:grid group';

  return (
    <ul className={listClassName}>
      {links.map((link) => (
        <li key={link.href}>
          <LinkComponent
            href={link.href}
            text={link.text}
            isActive={link.href === activePath}
            isIndeterminate={isIndeterminate}
            onSelect={onSelect}
            variant={variant}
          />
        </li>
      ))}
    </ul>
  );
}

export type { NavLink };
