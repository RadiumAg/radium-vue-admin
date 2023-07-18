import type { InternalAxiosRequestConfig } from 'axios';

export const requestInterceptors = (value: InternalAxiosRequestConfig) => {
  return value;
};
