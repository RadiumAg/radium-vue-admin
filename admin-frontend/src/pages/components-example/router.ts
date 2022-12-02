import { nestedRouter } from './nested/router';
import type { RouteRecordRaw } from 'vue-router';

export const componentsExampleRouter: RouteRecordRaw = {
  name: '组件',
  path: 'components_example',
  children: [
    {
      name: '表格',
      path: 'edit_table',
      component: () => import('./edit-table/edit-table.vue'),
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
    {
      name: '贝塞尔曲线',
      path: 'bezier_curve',
      component: () => import('./bezier-curve/bezier-curve.vue'),
    },
    { name: '图表', path: '/form', component: () => import('./form/form.vue') },
    nestedRouter,
  ],
};
