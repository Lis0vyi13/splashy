import { toast } from 'sonner';

import type { User } from '@/entities/user';
import { QUERY_KEYS } from '@/entities/user';

import { queryClient } from '@/shared/api/queryClient';
import { useMutate } from '@/shared/api/useMutate';

import { uploadUserAvatar } from '../api';
import type { UploadUserAvatarResponse } from './types';

export const useUploadUserAvatarMutation = () => {
  return useMutate<UploadUserAvatarResponse, FormData>(uploadUserAvatar, {
    onSuccess: (avatarUrl) => {
      toast.success('User avatar updated successfully!');
      queryClient.setQueryData(QUERY_KEYS.me, (oldData: User) => ({
        ...oldData,
        avatar: avatarUrl.url,
      }));
    },
  });
};
