import { Menu } from './apis/menu/menu';
import { OAth } from './apis/oath/login';
import { Role } from './apis/role/role';
import { User } from './apis/user/user';
import { Upload } from './apis/upload/upload';
import type { App, InjectionKey } from 'vue';

export class ApiInstance {
  readonly menu = new Menu();
  readonly oath = new OAth();
  readonly role = new Role();
  readonly user = new User();
  readonly upload = new Upload();
}

const key: InjectionKey<ApiInstance> = Symbol();

export const installApi: (app: App, ...options: any[]) => any = app => {
  app.provide<ApiInstance>(key, new ApiInstance());
};

export const useApi = () => {
  return inject<ApiInstance>(key, new ApiInstance());
};
