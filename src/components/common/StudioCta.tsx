import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { WHATSAPP_LINK } from '@/data/links';
import cn from '@/utils/cn';

type StudioCtaProps = ComponentPropsWithoutRef<'a'> & {
  readonly children: ReactNode;
  readonly variant?: 'primary' | 'secondary';
};

const baseClasses =
  'font-semibold antialiased py-2 transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2';

const variantClasses = {
  primary:
    'bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] focus-visible:outline-orange-500 active:scale-[.97]',
  secondary:
    'border border-zinc-200 text-sm shadow-xs focus-visible:outline-neutral-400 active:scale-[.99] dark:border-zinc-800 dark:bg-neutral-900 dark:focus-visible:outline-neutral-500',
} as const satisfies Record<NonNullable<StudioCtaProps['variant']>, string>;

const StudioCta = forwardRef<HTMLAnchorElement, StudioCtaProps>(
  ({ href = WHATSAPP_LINK, variant = 'primary', className, children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </a>
  )
);

StudioCta.displayName = 'StudioCta';

export default StudioCta;
