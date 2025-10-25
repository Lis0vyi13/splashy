'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from '@/shared/lib/utils';

type LogoVariant = 'small' | 'medium' | 'large';

const sizeMap: Record<LogoVariant, number> = {
  small: 42,
  medium: 64,
  large: 90,
};

type AvatarRootProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
>;

export interface AvatarProps extends AvatarRootProps {
  variant?: LogoVariant;
}

type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;
type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, variant, ...props }, ref) => {
  const size = variant ? sizeMap[variant] : sizeMap['medium'];
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',

        className
      )}
      data-slot="avatar"
      style={{ width: size, height: size }}
      tabIndex={0}
      {...props}
    />
  );
});
AvatarRoot.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square size-full', className)}
    data-slot="avatar-image"
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'bg-muted flex size-full items-center justify-center rounded-full',
      className
    )}
    data-slot="avatar-fallback"
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});

export default Avatar;
