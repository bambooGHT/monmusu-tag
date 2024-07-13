import { shallowReactive } from "vue";
import { UnitSpineData } from "./types";
import updateSpineMonitor from "./spineLoadProgress";
import { Assets } from "pixi.js";
import UnitSpineProgram from "@/monmusu_canvas/unitSpine/unitSpineProgram";

class MonmusuSpine {
  resourceId = 0;
  isLoading = false;
  unitSpineProgram: UnitSpineProgram;

  data = shallowReactive<UnitSpineData>({
    /** 单位json对象 */
    spineResource: { "c": { src: '', resourceCount: 0 } },
    /** 当前json */
    currentSpineType: undefined,
    /** 加载进度 */
    spineLoadedCount: 0,
    spineAnimations: [],
    currentAnimation: "wait",
  });

  get renderer() {
    return this.unitSpineProgram.pixiApp.renderer;
  }

  constructor() {
    const unitSpineProgram = new UnitSpineProgram();
    this.unitSpineProgram = unitSpineProgram;
  }

  updateSpineResource(spineResource: UNIT.SpineResource, resourceId: number) {
    const { data } = this;
    if (data.spineResource === spineResource) {
      this.firstLoad();
      return;
    }
    data.spineResource = spineResource;
    data.currentSpineType = undefined;
    this.resourceId = resourceId;
    this.#firstLoad();
  }

  async load(spineInfo: UNIT.SpineInfo, type: UNIT.SpineType) {
    const { data, unitSpineProgram } = this;
    if (this.isLoading || type === data.currentSpineType) return;
    this.isLoading = true;
    data.currentSpineType = type;
    data.spineAnimations = [];

    if (!Assets.cache.has(spineInfo.src)) {
      data.spineLoadedCount = 0;
      this.#resourceloadProgress(spineInfo.resourceCount);
    } else {
      data.spineLoadedCount = spineInfo.resourceCount;
    }
    await unitSpineProgram.load(spineInfo.src, type);

    data.spineAnimations = unitSpineProgram.spine2d.animations;
    data.currentAnimation = unitSpineProgram.spine2d.getCurrentAnimation();
    this.isLoading = false;
  }

  destroy(): void {
    const { data } = this;
    data.spineAnimations = [];
    this.unitSpineProgram.destroy();
  }

  toggleAnimation(name: string) {
    this.data.currentAnimation = name;
    this.unitSpineProgram.toggleAnimation(name);
  }

  firstLoad() {
    const { data } = this;
    const type = data.currentSpineType!;
    data.currentSpineType = undefined;
    if (!data.spineResource[type]) return;
    this.load(data.spineResource[type]!, type);
  }
  // 初次加载
  #firstLoad() {
    const { spineResource } = this.data;
    let value!: { type: UNIT.SpineType, resource?: UNIT.SpineInfo; };
    if (spineResource.p) {
      value = { type: "p", resource: spineResource.p };
    } else {
      const type = <UNIT.SpineType>Object.keys(spineResource)[0];
      value = { type: type, resource: spineResource[type] };
    }
    if (value.resource?.src) this.load(value.resource, value.type);
  }

  #resourceloadProgress(count: number) {
    const { data, resourceId } = this;

    updateSpineMonitor(resourceId, () => {
      if (++data.spineLoadedCount === count) {
        updateSpineMonitor.reset();
      }
    });
  }
};

const monmusuSpine = new MonmusuSpine();
export default monmusuSpine;