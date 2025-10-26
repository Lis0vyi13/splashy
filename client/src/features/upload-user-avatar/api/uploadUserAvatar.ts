import { baseClient } from '@/app';

import type { UploadUserAvatarResponse } from '../model';

export const uploadUserAvatar = async (
  data: FormData
): Promise<UploadUserAvatarResponse> => {
  const response = await baseClient.post<UploadUserAvatarResponse>(
    '/users/upload-avatar',
    data
  );

  return response.data;
};
