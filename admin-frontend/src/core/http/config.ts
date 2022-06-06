import qs from 'qs';
import type { AxiosRequestConfig } from 'axios';

export const defaultConfig: AxiosRequestConfig = {
  withCredentials: true,
  paramsSerializer: params => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
};
