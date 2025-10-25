import { baseClient } from '@/app';

import type { User } from '../model';

export const fetchMe = async () => {
  const response = await baseClient.get<User>('/auth/me');
  return response.data;
};
