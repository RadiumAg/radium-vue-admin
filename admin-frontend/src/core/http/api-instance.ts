import { App, InjectionKey, inject } from 'vue';
import { Menu } from './apis/menu/menu';
import { OAth } from './apis/oath/login';

export class ApiInstance {
  readonly menu = new Menu();
  readonly oath = new OAth();
}

const key: InjectionKey<ApiInstance> = Symbol();

export const installApi: (app: App, ...options: any[]) => any = app => {
  app.provide<ApiInstance>(key, new ApiInstance());
};

export const useApi = () => {
  return inject<ApiInstance>(key) as ApiInstance;
};
