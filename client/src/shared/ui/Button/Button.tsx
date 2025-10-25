import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/80',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/70 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-ghost bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-primary dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3.5 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      fontSize: {
        base: 'text-base',
        sm: 'text-sm',
        lg: 'text-lg',
      },
      rounded: {
        full: 'rounded-full',
        lg: 'rounded-lg',
        none: 'rounded-0',
      },
      width: {
        full: 'w-full',
        max: 'w-max',
      },
      alignment: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fontSize: 'base',
      rounded: 'full',
      width: 'max',
      alignment: 'center',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      width,
      size,
      rounded,
      fontSize,
      alignment,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({
            variant,
            size,
            width,
            rounded,
            fontSize,
            alignment,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
