import { toast } from 'sonner';

import { QUERY_KEYS, type User } from '@/entities/user';

import { queryClient } from '@/shared/api/queryClient';
import { useMutate } from '@/shared/api/useMutate';

import { updateMe } from '../api';
import type { UserGeneralData } from './userGeneralDataSchema';

export const useUpdateMeMutation = () => {
  return useMutate<User, UserGeneralData>(updateMe, {
    onSuccess: (updatedUser) => {
      toast.success('User updated successfully!');
      queryClient.setQueryData(QUERY_KEYS.me, updatedUser);
    },
  });
};
