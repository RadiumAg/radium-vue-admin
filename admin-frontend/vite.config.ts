import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/pages/components'),
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'http://121.199.50.60:8002',
      },
    },
  },
});
