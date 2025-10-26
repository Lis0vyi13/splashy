import { toast } from 'sonner';

import { QUERY_KEYS, type User } from '@/entities/user';

import { queryClient, useMutate } from '@/shared/api';

import { updateEmail } from '../api';
import type { UpdateEmailData } from './updateEmailSchema';

export const useUpdateEmailMutation = () => {
  return useMutate<User, UpdateEmailData>(updateEmail, {
    onSuccess: (updatedUser) => {
      toast.success('Email updated successfully!');
      queryClient.setQueryData(QUERY_KEYS.me, updatedUser);
    },
  });
};
