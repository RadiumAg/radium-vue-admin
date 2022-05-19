import qs from 'qs';
import { AxiosRequestConfig } from 'axios';

export const defaultConfig: AxiosRequestConfig = {
  withCredentials: true,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
};
