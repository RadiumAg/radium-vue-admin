import type { InjectionKey, Ref } from 'vue';

type MenuSettingProvide = {
  roleId: Ref<string>;
};

const MENU_SETTING_PROVIDE: InjectionKey<MenuSettingProvide> = Symbol();

export { MENU_SETTING_PROVIDE };
export type { MenuSettingProvide };
