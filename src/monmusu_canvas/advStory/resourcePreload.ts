import { Assets } from "pixi.js";
import { AdvAudio } from "./audio";
import { resourceTypePrefixes } from "./config";

export enum ResourceType {
  "" = "Unit",
  BgEvent = "Event",
  Bgm = "Bgm",
  Bg = "Bg",
  Se = "Se",
  Sprite = "Sprite"
}
export type ResourceData = {
  type: ResourceType;
  rowIndex: number;
  file?: string;
  voice?: string;
};

export class ResourcePreload {
  private resourceData: ResourceData[] = [];
  private maxInterpolation: number;
  private preloadCount: number;
  private currentIndex = 0;

  constructor(preloadCount = 5, maxInterpolation = 5) {
    this.preloadCount = preloadCount;
    this.maxInterpolation = maxInterpolation;
  }

  async updateResource(resourceData: ResourceData[]) {
    this.resourceData = resourceData;
    AdvAudio.cancelPreload();

    const currentIndex = this.currentIndex = this.preloadCount;

    for (let i = 0; i < currentIndex; i++) {
      await ResourcePreload.loadResource(resourceData[i]);
    }
  }

  async nextPreload(rowIndex: number) {
    const { resourceData, currentIndex, maxInterpolation } = this;
    const currentData = resourceData[currentIndex];

    if (currentData.rowIndex - rowIndex <= maxInterpolation) {
      AdvAudio.cancelPreload();
      ResourcePreload.loadResource(currentData);
      this.currentIndex += 1;
    }
  }

  static async loadResource({ file, voice, type }: ResourceData) {
    if (file) {
      file.endsWith("wav") ? AdvAudio.preLoad(type as any, file) : await ResourcePreload.backgroundLoad(type, file, file);
    }
    if (voice) {
      AdvAudio.preLoad("Voice", voice);
    }
  }

  static async backgroundLoad(type: ResourceType, alias: string, src: string) {
    src = resourceTypePrefixes[type] + src;

    if (!Assets.cache.has(alias)) {
      Assets.add({ src, alias });
    }

    await Assets.backgroundLoad(src);
  }

}