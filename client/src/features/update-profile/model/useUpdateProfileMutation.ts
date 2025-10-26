import { toast } from 'sonner';

import { QUERY_KEYS, type User } from '@/entities/user';

import { queryClient } from '@/shared/api/queryClient';
import { useMutate } from '@/shared/api/useMutate';

import { updateProfile } from '../api';
import type { ProfileData } from './profileSchema';

export const useUpdateProfileMutation = () => {
  return useMutate<User, ProfileData>(updateProfile, {
    onSuccess: (updatedUser) => {
      toast.success('User updated successfully!');
      queryClient.setQueryData(QUERY_KEYS.me, updatedUser);
    },
  });
};
