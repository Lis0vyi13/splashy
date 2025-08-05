import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-cyan-300 dark:focus-visible:ring-gray-600 focus-visible:ring-[2px] dark:focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      height: {
        sm: 'h-8 text-sm',
        md: 'h-9 text-base',
        lg: 'h-12 text-lg',
      },
    },
    defaultVariants: {
      height: 'md',
    },
  }
);

type InputVariants = VariantProps<typeof inputVariants>;
type InputProps = React.ComponentProps<'input'> &
  InputVariants & {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  };

const divHeight = {
  sm: 'h-8',
  md: 'h-9',
  lg: 'h-11',
};

const Input = ({
  className,
  type,
  height,
  startAdornment,
  endAdornment,
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        'relative flex items-center rounded-md bg-transparent',
        divHeight[height || 'md'],
        className
      )}
    >
      {startAdornment && (
        <span className="pl-3 text-muted-foreground pointer-events-none">
          {startAdornment}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ height }), {
          'pl-1': !!startAdornment,
          'pr-1': !!endAdornment,
        })}
        {...props}
      />
      {endAdornment && (
        <span className="pr-3 text-muted-foreground pointer-events-none">
          {endAdornment}
        </span>
      )}
    </div>
  );
};

export default Input;
