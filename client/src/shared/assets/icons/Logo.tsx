import { LOGO } from '@/shared/config';
import { Avatar } from '@/shared/ui';
import type { AvatarProps } from '@/shared/ui/Avatar';

const Logo = ({ variant, ...props }: AvatarProps) => {
  return (
    <Avatar {...props} variant={variant}>
      <Avatar.Image src={LOGO} alt="Company Logo" />
      <Avatar.Fallback>SL</Avatar.Fallback>
    </Avatar>
  );
};

export default Logo;
