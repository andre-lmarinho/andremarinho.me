import type { ComponentPropsWithoutRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@/utils/cn';

const buttonStyles = cva(
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

export const STUDIO_CONTACT_URL = 'https://wa.me/5571984770061';

type CommonButtonProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof buttonStyles>;

type AnchorButtonProps = CommonButtonProps &
  Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'children'> & {
    as?: 'a';
    href?: string;
  };

type NativeButtonProps = CommonButtonProps &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & {
    as: 'button';
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, forwardedRef) => {
    if (props.as === 'button') {
      const {
        as: _as,
        children,
        className,
        size,
        type = 'button',
        variant,
        ...buttonProps
      } = props;

      return (
        <button
          {...buttonProps}
          type={type}
          ref={forwardedRef as ForwardedRef<HTMLButtonElement>}
          className={cn(buttonStyles({ variant, size }), className)}
        >
          {children}
        </button>
      );
    }

    const {
      as: _as,
      children,
      className,
      href = STUDIO_CONTACT_URL,
      rel = 'noopener noreferrer',
      size,
      target = '_blank',
      variant,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        href={href}
        rel={rel}
        target={target}
        ref={forwardedRef as ForwardedRef<HTMLAnchorElement>}
        className={cn(buttonStyles({ variant, size }), className)}
      >
        {children}
      </a>
    );
  }
);

Button.displayName = 'Button';

export { buttonStyles as buttonVariants };
export default Button;
