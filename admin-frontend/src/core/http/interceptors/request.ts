import { AxiosRequestConfig } from 'axios';

export const requestInterceptors = (value: AxiosRequestConfig) => {
  return value;
};
