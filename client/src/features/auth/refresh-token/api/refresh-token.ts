import { baseClient } from '@/app';

import { type Tokens } from '@/entities/session';

export const refreshToken = async () => {
  const response = await baseClient.post<Tokens>('/auth/refresh');

  return response.data;
};
