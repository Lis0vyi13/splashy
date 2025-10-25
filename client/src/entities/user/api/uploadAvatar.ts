import { baseClient } from '@/app';

export type UploadAvatarResponse = { url: string };

export const uploadAvatar = async (
  data: FormData
): Promise<UploadAvatarResponse> => {
  const response = await baseClient.post<UploadAvatarResponse>(
    '/users/upload-avatar',
    data
  );

  return response.data;
};
