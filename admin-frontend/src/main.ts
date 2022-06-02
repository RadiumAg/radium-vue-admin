import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { installApi } from '@core/http/api-instance';
import { router } from './router';
import 'animate.less/animate.css';
import '@assets/css/common.scss';
import App from './App.vue';
import 'element-plus/theme-chalk/index.css';

createApp(App).use(router).use(installApi).use(createPinia()).mount('#app');
