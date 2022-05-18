import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

import 'animate.less/animate.css';
import '@assets/css/common.scss';

import { installApi } from './http/api-instance';

createApp(App).use(router).use(installApi).mount('#app');
