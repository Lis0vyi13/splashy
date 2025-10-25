import { baseClient } from '@/app';

import { type Tokens } from '@/entities/session';

import type { SignUpFormData } from '../model';

export const signUp = async (data: SignUpFormData): Promise<Tokens> => {
  const response = await baseClient.post<Tokens>('/auth/signup', data);

  return response.data;
};
