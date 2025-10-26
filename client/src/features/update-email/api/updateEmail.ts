import { baseClient } from '@/app';

import type { RequestEmailChangeResponse, UpdateEmailData } from '../model';

export const updateEmail = async (
  data: UpdateEmailData
): Promise<RequestEmailChangeResponse> => {
  const response = await baseClient.patch<RequestEmailChangeResponse>(
    '/users/request-email-change',
    data
  );

  return response.data;
};
