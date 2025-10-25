import { baseClient } from '@/app';

import type { User } from '@/entities/user';

import type { UserGeneralData } from '../model';

export const updateMe = async (data: UserGeneralData): Promise<User> => {
  const response = await baseClient.patch<User>('/users/me', data);

  return response.data;
};
