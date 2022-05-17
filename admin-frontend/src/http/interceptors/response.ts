import { AxiosError, AxiosResponse } from 'axios';

export const responseSuccess = (response: AxiosResponse) => {
  return response;
};

export const responseError = (error: AxiosError) => {
  return error;
};
