import type { AxiosError } from 'axios';

import type { ApiError } from './types';

export const getErrorMessage = (err: AxiosError<ApiError>): string => {
  try {
    const msg = Array.isArray(err.response?.data.message)
      ? err.response?.data?.message[0].toString()
      : err.response?.data.message.toString();

    return msg || 'An unknown error occurred';
  } catch {
    return 'An unknown error occurred';
  }
};
