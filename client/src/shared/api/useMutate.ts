import type {
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { getErrorMessage } from './getErrorMessage';
import type { ApiError } from './types';

export const useMutate = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<
    UseMutationOptions<TData, AxiosError<ApiError>, TVariables>,
    'mutationFn'
  >
): UseMutationResult<TData, AxiosError<ApiError>, TVariables> => {
  return useMutation<TData, AxiosError<ApiError>, TVariables>({
    mutationFn,
    onError: (error: AxiosError<ApiError>) => {
      toast.error(getErrorMessage(error));
    },
    ...options,
  });
};
