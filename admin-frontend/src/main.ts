import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { installApi } from '@core/http';
import VueKonva from 'vue-konva';
import { useErrorMessage } from '@core/hooks';
import { router } from './router';
import '@csstools/normalize.css';
import '@assets/css/common.scss';
import 'uno.css';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import App from './App.vue';

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(installApi)
  .use(VueKonva);

app.config.errorHandler = error => {
  useErrorMessage(error);
};

app.mount('#app');
