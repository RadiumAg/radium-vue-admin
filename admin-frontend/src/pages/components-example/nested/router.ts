import type { RouteRecordRaw } from 'vue-router';

export const nestedRouter: RouteRecordRaw = {
  name: '嵌套路由',
  path: 'nested_menu',
  component: () => import('./menu.vue'),
  children: [
    {
      name: 'menu1',
      path: 'menu1',
      component: () => import('./menu1/menu1.vue'),
      children: [
        {
          name: 'menu2',
          path: 'menu2',
          component: () => import('./menu2/menu2.vue'),
        },
      ],
    },
  ],
};
