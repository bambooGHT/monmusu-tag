import { defineConfig } from 'vite';
import vitePro from './vite.pro';
import viteDev from './vite.dev';
import vite from './vite';
const config = {
  build: { ...vite, ...vitePro },
  serve: { ...vite, ...viteDev }
};
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return config[command];
});