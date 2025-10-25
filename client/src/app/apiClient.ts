import { logout } from '@/features/auth/logout';
import { refreshToken } from '@/features/auth/refresh-token';

import { clearAccessToken, setAccessToken } from '@/entities/session';

import { baseClient, queryClient } from '@/shared/api';
import { ROUTES } from '@/shared/config';

import { store } from './store';

baseClient.interceptors.request.use((config) => {
  const token = store.getState().session.accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { accessToken } = await refreshToken();
        store.dispatch(setAccessToken(accessToken));

        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return baseClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearAccessToken());
        queryClient.clear();
        await logout();
        window.location.href = ROUTES.LOGIN;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { baseClient };
