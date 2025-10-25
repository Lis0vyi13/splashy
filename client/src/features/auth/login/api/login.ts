import { baseClient } from '@/app';

import type { LoginFormData } from '@/features/auth/login';

import { type Tokens } from '@/entities/session';

export const login = async (data: LoginFormData): Promise<Tokens> => {
  const response = await baseClient.post<Tokens>('/auth/login', data);

  return response.data;
};
