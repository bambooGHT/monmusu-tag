import type { DebugDraws } from "@/pixi1/spine2d/types";
import type { SpineEvents, SpineSlider, SpineType } from "./types";

export const designConfig = {
  canvas_width: 2600,
  canvas_height: 2000
};

export class UnitSpineConfig {
  debug: DebugDraws = {
    drawMeshHull: false,
    drawMeshTriangles: false,
    drawBones: false,
    drawPaths: false,
    drawBoundingBoxes: false,
    drawClipping: false,
    drawRegionAttachments: false
  };

  events: SpineEvents = {
    /** 移动 */
    pointerMove: false,
    /** 点击播放动画 */
    clickAnimation: false,
    /** 重复播放动画 */
    repeatAnimation: true,
    /** 点击播放语音 */
    // ClickVoice: false,
    /** 键盘控制 */
    keyboardControl: false,
    /** 滑条 */
    slider: true
  };

  bgBlur = 0;
  animationSpeed = 1;
  background = "black";
  currentSpineType: SpineType = "p";
  slider: { [index: string]: SpineSlider; } = {
    _s: {
      y: 0,
      scale: 0,
    },
    c: {
      y: 0,
      scale: 0,
    },
    p: {
      y: 0,
      scale: 0,
    },
    s: {
      y: 0,
      scale: 0,
    },
  };

  constructor() {
    const config = localStorage.getItem("CONFIG");
    if (config) Object.assign(this, JSON.parse(config));
    // 监听页面离开保存配置
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        localStorage.setItem("CONFIG", JSON.stringify(this));
      }
    });
  }
}