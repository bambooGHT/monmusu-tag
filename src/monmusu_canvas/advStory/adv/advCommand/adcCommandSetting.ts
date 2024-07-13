import type { DisplayObject } from "pixi.js";
import { advAudio } from "../../audio";
import { Story } from "../../views/story/story";
import { Layer } from "../advComponents";
import PixiApp from "@/pixi1/pixiApp";

export type DisplayElType = "Character" | "Bg" | "BgEvent" | "Sprite";

export type { SoundCategory } from "../../audio";

export { designConfig } from "../../config";

export const getView = Story.getView;

export const audio = advAudio;

export const displayEl = new class DisplayEl {
  private Character = new Map<string, DisplayObject>();

  private Bg = new Map<string, DisplayObject>();

  private BgEvent = new Map<string, DisplayObject>();

  private Sprite = new Map<string, DisplayObject>();

  get(type: DisplayElType, key: string) {
    return this[type].get(key);
  }

  set(type: DisplayElType, key: string, el: DisplayObject) {
    return this[type].set(key, el);
  }

  delete(type: DisplayElType, key: string) {
    const el = this[type].get(key);
    
    this[type].delete(key);
    el && PixiApp.destroy([el]);
  }

  clearDisplayEl(type: DisplayElType) {
    PixiApp.destroy([...this[type].values()]);
    this[type].clear();
  }
};

export const layerEl = new class LayerEl {
  private layerContainer = getView("Layer");

  private layerElList = new Map<string, Layer>();

  getLayer<T extends boolean>(key: string, create?: T): T extends true ? Layer : Layer | undefined {
    let layer = this.layerElList.get(key);
    // create === true => create and add view
    if (!layer && create) {
      const layerPatams = AdvGlobal.advStorySettingData.getSettingValue("Layer", key);

      layer = new Layer(layerPatams);
      this.layerElList.set(key, layer);
      this.layerContainer.getLayer(layerPatams.Type).addChild(layer);
    }

    return layer as any;
  }

  getLayerContainer(type: keyof typeof EStory.LayerType) {
    return this.layerContainer.getLayer(type);
  }

  clearLayerTo(key: string) {
    const layer = this.layerElList.get(key)!;
    PixiApp.destroy(layer.removeChildren());
  }

  clearLayer() {
    PixiApp.destroy([...this.layerElList.values()]);
    this.layerElList.clear();
  }
};