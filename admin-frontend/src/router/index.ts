import { createRouter, createWebHistory } from 'vue-router';
import { loginBeforeEnter } from './guard/loginBeforeEnter';

const layout = import('@pages/layout/layout.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@pages/login/login.vue'),
    },
    {
      path: '',
      component: layout,
      beforeEnter: [loginBeforeEnter],
      children: [
        {
          path: '',
          component: () => import('@pages/home/home.vue'),
        },
      ],
    },
  ],
});
