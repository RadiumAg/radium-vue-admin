import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { installApi } from '@core/http/api-instance';
import { router } from './router';
import '@csstools/normalize.css';
import '@assets/css/common.scss';
import 'uno.css';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import App from './App.vue';

createApp(App).use(createPinia()).use(installApi).use(router).mount('#app');
