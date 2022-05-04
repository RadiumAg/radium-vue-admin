import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

import '@assets/css/common.scss';
import 'animate.less/animate.css';
import { installApi } from './http/api-instance';

createApp(App).use(router).use(installApi).mount('#app');
