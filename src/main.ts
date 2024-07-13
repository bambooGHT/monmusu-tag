// 枚举
import "@/enums";
// 判断函数
import "./utils/is";

import './styles/index.css';
import './styles/style.css';
import './utils/carousel/style/index.scss';

import { createApp } from 'vue';
import App from './App.vue';
import { Router } from './router';
import initAssets from "./pixi1/initAssets";
import { advStoryInit } from "./advStory";

initAssets(import.meta.env.VITE_ASSETS_URL, false);

if (location.pathname.includes("advStory")) {
  advStoryInit();
  document.body.classList.add("adv");
} else {
  document.body.classList.add("app");
  const app = createApp(App);
  app.use(Router);
  app.mount('#app');
}
