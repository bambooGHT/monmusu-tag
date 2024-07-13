import { DisplayObject, IApplicationOptions } from "pixi.js";
import { Application, Container } from "pixi.js";

class PixiApp<T extends DisplayObject = DisplayObject> {
  readonly PIXI: Application;
  readonly containers!: Container[];
  readonly stage: Container;

  get renderer() {
    return this.PIXI.renderer;
  }

  constructor(options: Partial<IApplicationOptions>, containerCount?: number) {
    options.sharedTicker = true;
    const pixi = new Application(options);
    const stage = pixi.stage;

    stage.eventMode = "static";
    pixi.ticker.maxFPS = 75;

    this.PIXI = pixi;
    this.stage = stage;
    if (containerCount) {
      this.containers = this.#initContainers(containerCount);
    }
    // const pointer = (e: PointerEvent) => {
    //   if (e.button !== 0) {
    //     e.stopPropagation();
    //   }
    // };
    // stage.onpointerdown = pointer;
    // stage.onpointerup = pointer;
    // stage.onpointertap = pointer;
  }

  setChildIndex(zIndex: number, child: T) {
    const container = this.containers[zIndex];
    container.setChildIndex(child, container.children.length - 1);
  }
  /** stage添加显示对象 */
  addChild<U extends T[]>(...children: U): U[0] {
    return this.stage.addChild(...children);
  }

  addChildAt<U extends T>(child: U, index: number) {
    return this.stage.addChildAt(child, index);
  }
  /** stage添加对象至层级位置 */
  addChildTo<U extends T[]>(zIndex: number, ...children: U) {
    return this.containers[zIndex].addChild(...children);
  }
  /** stage添加对象至层级&索引位置 */
  addChildToContainerAt<U extends T>(child: U, zIndex: number, index: number = 0): U {
    return this.containers[zIndex].addChildAt(child, index);
  }
  /** 获取层级容器数量 */
  getContainerCountAt(zIndex: number) {
    return this.containers[zIndex].children.length;
  }
  /** 从stage删除对象 */
  removeChild<U extends T[]>(...children: U) {
    this.stage.removeChild(...children);
  }
  /** stage从层级删除对象 */
  removeChildTo<U extends T[]>(index: number, ...children: U) {
    this.containers[index].removeChild(...children);
  }
  /** stage从层级&索引删除对象 */
  removeChildToContainerAt(zIndex: number, index: number = 0, isDestroy: boolean = true) {
    const child = this.containers[zIndex].removeChildAt(index);
    if (isDestroy) this.destroy(child);
  }
  /** stage从层级删除对应对象并销毁 */
  // destroyContainerTo<U extends T[]>(index: number, ...children: U) {
  //   const container = this.containers[index];
  //   children.forEach(child => {
  //     container.removeChild(child);
  //     this.destroy(child);
  //   });
  // }
  /** stage从层级删除所有对象并销毁 */
  destroyContainerAllTo(index: number) {
    const container = this.containers[index];
    let child = container.children[0];

    while (child) {
      container.removeChild(child);
      this.destroy(child);
      child = container.children[0];
    }
  }
  /** 销毁传入的对象 */
  destroy(...el: DisplayObject[]) {
    PixiApp.destroy(el);

  }

  static destroy(displayObjects: DisplayObject[]) {
    displayObjects.forEach(obj => obj.destroy({
      children: true,
      texture: false,
      baseTexture: false
    }));
  }

  #initContainers(maxIndex: number) {
    const containers: Container[] = [];

    for (let index = 0; index < maxIndex; index++) {
      const container = new Container();
      container.zIndex = index;
      containers.push(container);
    }

    this.stage.addChild(...containers);

    return containers;
  }
}

export default PixiApp;