import type { AxiosError } from 'axios';

export type AxiosApiError<
  TRequest extends Record<string, unknown> = Record<string, unknown>,
> = AxiosError<ApiError<TRequest>>;

export type ApiError<
  TRequest extends Record<string, unknown> = Record<string, unknown>,
> = {
  message: ApiErrorDetail<TRequest>[] | string[] | string;
};

export type ApiErrorDetail<TRequest extends Record<string, unknown>> = {
  loc: ('body' | keyof TRequest)[];
  msg: string;
  type: string;
};
