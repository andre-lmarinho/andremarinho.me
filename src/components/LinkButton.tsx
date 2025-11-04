import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const STUDIO_CONTACT_URL = 'https://wa.me/5571984770061';

const linkButtonStyles = cva(
  'inline-flex items-center justify-center px-6 py-2 font-semibold antialiased transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        default:
          'rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 text-white shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] focus-visible:outline-orange-500 active:scale-[.97]',
        muted:
          'gap-x-1.5 rounded-lg border border-zinc-200 text-sm shadow-xs focus-visible:outline-neutral-400 active:scale-[.99] dark:border-zinc-800 dark:bg-neutral-900 dark:focus-visible:outline-neutral-500',
      },
      size: {
        default: '',
        full: 'block w-full text-center',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type LinkButtonProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof linkButtonStyles> &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'>;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { children, className, variant = 'default', size = 'default', href, target, rel, ...rest },
    ref
  ) => {
    const finalHref = href ?? STUDIO_CONTACT_URL;
    const finalTarget = target ?? (href ? undefined : '_blank');
    const finalRel = rel ?? (finalTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <a
        href={finalHref}
        target={finalTarget}
        rel={finalRel}
        ref={ref}
        className={cn(linkButtonStyles({ variant, size }), className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
