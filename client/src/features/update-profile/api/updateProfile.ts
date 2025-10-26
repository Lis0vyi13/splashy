import { baseClient } from '@/app';

import type { User } from '@/entities/user';

import type { ProfileData } from '../model';

export const updateProfile = async (data: ProfileData): Promise<User> => {
  const response = await baseClient.patch<User>('/users/me', data);

  return response.data;
};
