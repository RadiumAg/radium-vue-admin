import { AxiosError, AxiosResponse } from 'axios';

export const responseSussess = (response: AxiosResponse) => {
  return response;
};

export const responseError = (error: AxiosError) => {
  return error;
};
