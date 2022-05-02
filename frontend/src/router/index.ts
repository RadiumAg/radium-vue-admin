import { createRouter, createWebHistory } from 'vue-router';

const layout = import('@pages/layout/layout.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      component: layout,
    },
  ],
});
