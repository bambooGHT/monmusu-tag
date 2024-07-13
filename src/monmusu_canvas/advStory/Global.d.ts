import type { AdvStorySettingData } from "./adv/advStorySettingData";

declare global {
  var AdvGlobal: {
    advStorySettingData: AdvStorySettingData;
  };
}