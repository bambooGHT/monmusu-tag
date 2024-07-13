import { Container, Graphics } from "pixi.js";

class Layer {
  view = new Container();

  private layerEls: Map<keyof typeof EStory.LayerType, Container>;

  constructor() {
    const layerTypes = Object.keys(EStory.LayerType);

    const layerEls = layerTypes.map(p => {
      const layerType = new Container();

      // 让子元素根据Order排序
      layerType.sortChildren();
      this.view.addChild(layerType);
      return [p, layerType];
    });

    this.layerEls = new Map(layerEls as any);
  }

  getLayer(type: keyof typeof EStory.LayerType) {
    return this.layerEls.get(type)!;
  }
}

class StoryContainers {
  Fade = new Graphics();
  Layer = new Layer();
}

export class Story {
  static storyContainers = new StoryContainers();

  view: Container;

  constructor() {
    const containers = Story.storyContainers;
    const view = this.view = new Container();

    view.addChild(containers.Layer.view);
    view.addChild(containers.Fade);
  }

  static getView<T extends keyof StoryContainers>(key: T): StoryContainers[T] {
    return Story.storyContainers[key];
  }
}