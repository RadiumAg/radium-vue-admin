import axios from 'axios';
import { defaultConfig } from '../config';
import { requestInterceptors } from '../interceptors/request';
import { responseError, responseSuccess } from './../interceptors/response';

type ApiParams = {
  host?: string;
  prefix: string;
};

export const Api = ({ host, prefix }: ApiParams) => {
  return function <T extends { new (...args: any[]) }>(constructor: T) {
    const hostUrl =
      host === undefined ? (import.meta.env.VITE_API_BASE_URL as string) : '';
    const axiosInstance = axios.create({
      ...defaultConfig,
      baseURL: hostUrl + prefix,
    });

    axiosInstance.interceptors.response.use(responseSuccess, responseError);
    axiosInstance.interceptors.request.use(requestInterceptors);

    return class extends constructor {
      http = axiosInstance;
    };
  };
};
