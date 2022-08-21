import type { RouteRecordRaw } from 'vue-router';

export const menuSettingRouter: RouteRecordRaw = {
  name: '基础设置',
  path: 'basic_setting',
  component: () => import('./router.vue'),
  children: [
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
    {
      name: '用户设置',
      path: 'user_manager',
      component: () => import('./user_manager/user-manager.vue'),
    },
  ],
};
