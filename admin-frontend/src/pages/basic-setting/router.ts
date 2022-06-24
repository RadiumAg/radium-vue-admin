import type { RouteRecordRaw } from 'vue-router';

export const menuSettingRouter: RouteRecordRaw = {
  name: '基础设置',
  path: 'basic_setting',
  component: () => import('./router.vue'),
  children: [
    {
      path: '',
      redirect: {
        name: '菜单设置',
      },
    },
    {
      name: '菜单设置',
      path: 'menu_setting',
      component: () => import('./menu-setting/menu-setting.vue'),
    },
    {
      name: '角色设置',
      path: 'role_setting',
      component: () => import('./role-setting/role-setting.vue'),
    },
  ],
};
