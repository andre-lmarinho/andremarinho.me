import Link from 'next/link';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'a'> & { href: string };

export function SmartLink({ href, className = '', ...props }: Props) {
  const isInternal = href.startsWith('/') && !href.startsWith('//');

  const base = 'rounded-xs underline underline-offset-2 transition-colors hover:opacity-90';

  const cls = `${base} ${className}`.trim();

  const rel = props.rel ?? (isInternal ? undefined : 'noopener noreferrer');
  const target = props.target ?? (isInternal ? undefined : '_blank');

  if (isInternal) {
    return <Link href={href} className={cls} {...props} />;
  }

  return <a href={href} className={cls} rel={rel} target={target} {...props} />;
}
