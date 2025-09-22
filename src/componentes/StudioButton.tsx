import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import cn from '@/utils';

const studioButtonStyles = {
  primary:
    'inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-2 font-semibold text-white antialiased shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.97]',
  secondary:
    'inline-flex items-center justify-center gap-x-1.5 rounded-lg border border-zinc-200 px-6 py-2 text-sm font-semibold antialiased shadow-xs transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-[.99] dark:border-zinc-800 dark:bg-neutral-900 dark:focus-visible:outline-neutral-500',
} as const;

const STUDIO_CONTACT_URL = 'https://wa.me/5571984770061';

type StudioButtonVariant = keyof typeof studioButtonStyles;

type StudioButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: StudioButtonVariant;
  href?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'target' | 'rel'>;

const StudioButton = forwardRef<HTMLAnchorElement, StudioButtonProps>(
  (
    { variant = 'primary', className, children, href = STUDIO_CONTACT_URL, ...rest },
    forwardedRef
  ) => (
    <a
      {...rest}
      ref={forwardedRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(studioButtonStyles[variant], className)}
    >
      {children}
    </a>
  )
);

StudioButton.displayName = 'StudioButton';

export type { StudioButtonVariant };
export default StudioButton;
