import { toast } from 'sonner';

import { useMutate } from '@/shared/api';

import { updateEmail } from '../api';
import type { RequestEmailChangeResponse } from './types';
import type { UpdateEmailData } from './updateEmailSchema';

export const useUpdateEmailMutation = () => {
  return useMutate<RequestEmailChangeResponse, UpdateEmailData>(updateEmail, {
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};
