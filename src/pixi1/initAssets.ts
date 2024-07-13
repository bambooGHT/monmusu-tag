import { Assets } from "pixi.js";

const initAssets = (basePath: string, preferWorkers: boolean = true) => {
  Assets.init({ basePath });
  Assets.setPreferences({
    preferWorkers: preferWorkers,
    // preferCreateImageBitmap: false,
  });
};
export default initAssets;