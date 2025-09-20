'use client';

import NextLink from 'next/link';
import cn from '@/utils/cn';

export type NavLink = {
  href: `/${string}` | `https://${string}`;
  text: string;
};

type Variant = 'desktop' | 'mobile';

type LinkProps = {
  href: NavLink['href'];
  text: string;
  isActive: boolean;
  isIndeterminate: boolean;
  onSelect?: () => void;
  variant: Variant;
};

export default function LinkComponent({
  href,
  text,
  isActive,
  isIndeterminate,
  onSelect,
  variant,
}: LinkProps) {
  const className =
    variant === 'mobile'
      ? cn(
          'text-3xl font-semibold no-underline transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-400',
          isActive
            ? 'opacity-100'
            : 'opacity-50 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100'
        )
      : cn(
          'no-underline transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-400',
          isIndeterminate
            ? 'hover:opacity-60'
            : isActive
              ? 'opacity-100'
              : 'opacity-50 hover:opacity-100'
        );

  const handleClick = () => {
    onSelect?.();
  };

  if (href.startsWith('http')) {
    return (
      <a
        className={className}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        onClick={handleClick}
      >
        {text}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      className={className}
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
    >
      {text}
    </NextLink>
  );
}
