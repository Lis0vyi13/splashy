'use client';

import { useRouter } from 'next/navigation';

import type { Tokens } from '@/entities/session';

import { useMutate } from '@/shared/api/useMutate';
import { DEFAULT_LOGIN_REDIRECT } from '@/shared/config';

import { login } from '../api';
import type { LoginFormData } from './loginSchema';

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutate<Tokens, LoginFormData>(login, {
    onSuccess: () => {
      router.replace(DEFAULT_LOGIN_REDIRECT);
    },
  });
};
