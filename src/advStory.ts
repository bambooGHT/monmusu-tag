import { app, init } from "./monmusu_canvas/advStory";
import Resize from "./utils/resize";
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export const advStoryInit = () => {
  init();
  
  const view = app.PIXI.view;
  const aspectRatio = view.height / view.width;

  document.documentElement.style.height = "100%";

  new Resize(document.documentElement, () => {
    const { innerWidth, innerHeight } = window;

    const newHeight = aspectRatio * innerWidth;
    const newWidth = newHeight > innerHeight ? innerHeight / aspectRatio : innerWidth;

    view.style!.width = `${newWidth}px`;
  });

  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  document.body.appendChild(view as HTMLCanvasElement);
};

