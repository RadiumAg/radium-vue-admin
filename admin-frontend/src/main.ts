import { createApp } from 'vue';
import { installApi } from '@core/http/api-instance';
import App from './App.vue';
import { router } from './router';
import 'animate.less/animate.css';
import '@assets/css/common.scss';
import 'element-plus/theme-chalk/index.css';

createApp(App).use(router).use(installApi).mount('#app');
