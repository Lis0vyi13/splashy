import { baseClient } from '@/app';

import type { User } from '@/entities/user';

import type { UpdateEmailData } from '../model';

export const updateEmail = async (data: UpdateEmailData): Promise<User> => {
  const response = await baseClient.patch<User>('/users/update-email', data);

  return response.data;
};
