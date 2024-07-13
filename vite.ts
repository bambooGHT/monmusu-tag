import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import AutoExport from 'unplugin-auto-export/vite';

export default defineConfig({
  base: '/',

  resolve: {
    alias: {
      "@": '/src'
    }
  },
  plugins: [vue(), AutoExport({
    path: [
      "./src/monmusu_canvas/advStory/storyManage/command/items/*",
      "./src/monmusu_canvas/advStory/storyManage/command/commandBase/*"
    ]
  })],
  // server: {
  //   host: "192.168.42.80",
  //   port: 5173
  // },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/global.scss";`
      }
    },
    postcss: {
      plugins: [
        //語法降級
        postcssPresetEnv(),
        //瀏覽器前綴
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 87',
            '> 1%',
          ],
          remove: true,
        })]
    }
  }
});