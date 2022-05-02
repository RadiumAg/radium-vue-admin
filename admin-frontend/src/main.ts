import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';

import '@assets/css/common.scss';
import 'animate.less/animate.css';

createApp(App).use(router).mount('#app');
