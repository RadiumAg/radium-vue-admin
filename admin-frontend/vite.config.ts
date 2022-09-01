import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [
    vueJsx(),
    Unocss(),
    vue(),
    DefineOptions(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      dts: path.resolve(__dirname, 'src/auto-imports.d.ts'),
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
    ElementPlus({
      useSource: true,
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
    port: 3001,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
      },
    },
  },
});
