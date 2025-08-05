import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { type VariantProps, cva } from 'class-variance-authority';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

const checkboxVariants = cva(
  'peer cursor-pointer hover:bg-gray-200 border-input dark:bg-input/30 dark:hover:bg-input/60 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentProps<typeof CheckboxPrimitive.Root> & CheckboxVariants
>(({ className, size, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-4.5 text-green-600" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = 'Checkbox';

export default Checkbox;
