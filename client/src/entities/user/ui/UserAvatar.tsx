'use client';

import Image from 'next/image';

import { images } from '@/shared/assets';
import { Avatar } from '@/shared/ui';
import type { AvatarProps } from '@/shared/ui/Avatar';

import { useMeQuery } from '../model';

const UserAvatar = ({ variant, ...props }: AvatarProps) => {
  const user = useMeQuery();
  const avatarUrl = user.data?.avatar;
  const name = user.data?.name;

  return (
    <Avatar {...props} variant={variant}>
      <Avatar.Image src={avatarUrl} alt={name} title={name} />
      <Avatar.Fallback>
        <Image src={images.emptyAvatar} alt="empty-avatar" />
      </Avatar.Fallback>
    </Avatar>
  );
};

export default UserAvatar;
