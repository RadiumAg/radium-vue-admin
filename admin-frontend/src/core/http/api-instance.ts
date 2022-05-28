import { App, InjectionKey, inject } from 'vue';
import { OAth } from './apis/oath/login';

export class ApiInstance {
  readonly oath = new OAth();
}

const key: InjectionKey<ApiInstance> = Symbol();

export const installApi: (app: App, ...options: any[]) => any = app => {
  app.provide<ApiInstance>(key, new ApiInstance());
};

export const useApi = () => {
  return inject<ApiInstance>(key) as ApiInstance;
};
