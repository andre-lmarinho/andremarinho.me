import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

type Props = ComponentProps<'a'> & { href: string };

export function TextLink({ href, className, rel, target, ...props }: Props) {
  const isInternal = href.startsWith('/') && !href.startsWith('//');

  const cls = cn(
    'rounded-xs underline underline-offset-2 transition-colors hover:opacity-90',
    className
  );

  if (isInternal) {
    return <Link href={href} className={cls} {...props} />;
  }

  return (
    <a
      href={href}
      className={cls}
      rel={rel ?? 'noopener noreferrer'}
      target={target ?? '_blank'}
      {...props}
    />
  );
}
