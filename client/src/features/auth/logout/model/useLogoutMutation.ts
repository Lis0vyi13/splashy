'use client';

import { useRouter } from 'next/navigation';

import { clearAccessToken } from '@/entities/session';

import { queryClient, useMutate } from '@/shared/api';
import { ROUTES } from '@/shared/config';
import { useAppDispatch } from '@/shared/lib';

import { logout } from '../api';

export const useLogoutMutation = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutate<void, void>(logout, {
    onSuccess: () => {
      queryClient.clear();
      dispatch(clearAccessToken());
      router.replace(ROUTES.LOGIN);
    },
  });
};
