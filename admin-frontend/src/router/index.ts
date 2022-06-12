import { menuSettingRouter } from '@pages/basic-setting/router';
import { componentsExampleRouter } from '@pages/components-example/router';
import { createRouter, createWebHistory } from 'vue-router';
import progress from 'nprogress';
import { loginBeforeEnter } from './guard/loginBeforeEnter';
import 'nprogress/nprogress.css';

const layout = () => import('@pages/layout/layout.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@pages/login/login.vue'),
    },
    {
      path: '/',
      component: layout,
      beforeEnter: [loginBeforeEnter],
      children: [
        {
          path: '',
          component: () => import('@pages/home/home.vue'),
        },
        {
          path: ':pathMatch(.*)*',
          component: () => import('@pages/not-found.vue'),
        },
        menuSettingRouter,
        componentsExampleRouter,
      ],
    },
  ],
});

router.beforeEach(() => {
  progress.start();
});

router.afterEach(() => {
  progress.done();
});
