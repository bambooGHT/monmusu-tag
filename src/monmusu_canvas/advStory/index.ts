import "./adv/advEnums";
import PixiApp from "@/pixi1/pixiApp";
import { designConfig } from "./config";
import { test } from "./test";
import { useSWRAsync } from "@/service";
import { AdvStorySettingData } from "./adv/advStorySettingData";

export const app = new PixiApp({
  width: designConfig.canvas_width,
  height: designConfig.canvas_height,
  antialias: true,
  backgroundAlpha: 0,
  resolution: Math.max(2, window.devicePixelRatio)
});


const init = async () => {
  window.AdvGlobal = {} as any;

  const storySettingData = await useSWRAsync("advStorySettingData");
  AdvGlobal.advStorySettingData = new AdvStorySettingData(storySettingData);

  test();
};

init();