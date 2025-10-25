import { baseClient } from '@/app';

export const logout = async () => {
  const response = await baseClient.post('/auth/logout');
  return response.data;
};
