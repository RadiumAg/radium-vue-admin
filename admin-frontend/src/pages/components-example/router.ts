import { nestedRouter } from './nested/router';
import type { RouteRecordRaw } from 'vue-router';

export const componentsExampleRouter: RouteRecordRaw = {
  name: '组件',
  path: 'components_example',
  component: () => import('./router.vue'),
  children: [
    {
      path: '',
      redirect: {
        name: '上传组件',
      },
    },
    {
      name: '上传组件',
      path: 'upload',
      component: () => import('./upload/upload.vue'),
    },
    {
      name: '富文本编辑器',
      path: 'editor',
      component: () => import('./rich-editor/rich-editor.vue'),
    },
    nestedRouter,
  ],
};
