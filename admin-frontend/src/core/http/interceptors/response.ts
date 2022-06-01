import { AdminError } from '../admin-error';
import type { AxiosError, AxiosResponse } from 'axios';

export const responseSuccess = (response: AxiosResponse) => {
  const { msg, code } = response.data;
  if (code === 401) {
    return Promise.reject(new AdminError(msg, code));
  }
  return response;
};

export const responseError = (error: AxiosError) => {
  return Promise.reject(error);
};
