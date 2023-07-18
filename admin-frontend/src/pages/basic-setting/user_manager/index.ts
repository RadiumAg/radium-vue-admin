import type { InjectionKey, Ref } from 'vue';

const USER_MANAGER_PROVIDE_KEY: InjectionKey<UserManagerProvide> = Symbol(
  'USER_MANAGER_PROVIDE_KEY',
);

type UserManagerProvide = {
  userId: Ref<string>;
};

export { USER_MANAGER_PROVIDE_KEY };
export type { UserManagerProvide };
