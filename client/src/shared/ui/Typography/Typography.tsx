import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/shared/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-[1.5rem] lg:text-[2rem] font-semibold leading-[40px]',
      h2: 'text-xl lg:text-2xl',
      h3: 'text-lg lg:text-xl',
      p: 'text-base',
    },
    textColor: {
      primary: 'text-black',
      secondary: 'text-ghost',
    },
    affects: {
      caption: 'text-xs',
      small: 'text-sm',
      normal: 'text-sm lg:text-base',
      large: 'text-[2rem] lg:text-[2.3rem] font-semibold',
    },
    defaultVariants: {
      variant: 'p',
      textColor: 'primary',
      affects: 'normal',
      color: 'primary',
    },
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, variant, textColor, affects, ...props }, ref) => {
    const Comp = variant || 'p';
    return (
      <Comp
        className={cn(
          typographyVariants({
            variant,
            textColor,
            affects: variant === 'p' ? affects : undefined,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Typography.displayName = 'Typography';

export default Typography;
