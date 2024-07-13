import gsap from "gsap";
import { DisplayObject } from "pixi.js";

const processParams = (params: string, isPixi: boolean = false): Record<string, number> => {
  params = params.replace("time", "duration").replace("z", "rotation");

  const paramEntries = params.split(" ").map(p => {
    const [key, value] = p.split('=');
    return [key, +value];
  });
  const result = Object.fromEntries(paramEntries);

  if (isPixi) {
    const duration = result.duration;
    delete result.duration;
    return { duration, pixi: result };
  }

  return result;
};

const processTargetParams = (target: DisplayObject, params: string) => {
  const value = processParams(params, target instanceof DisplayObject);
  return value;
};

enum TweenEffect {
  easeOutQuart = "power3.out",
  easeOutBack = "back.out"
}

export class Tween {
  static async ShakePosition(target: DisplayObject, params: STORY.CommandParams) {
    const frequency = 6;
    const { duration, x = 0, y = 0 } = processParams(params.Arg3);
    const timeline = gsap.timeline({
      defaults: {
        duration: duration / 7,
        ease: TweenEffect[params.Arg4 as keyof typeof TweenEffect] || "none"
      }
    });

    for (let i = 0; i < frequency; i++) {
      const factor = (frequency - i) / frequency;
      const xOffset = i % 2 === 0 ? x * factor : -x * factor;
      const yOffset = i % 2 === 0 ? y * factor : -y * factor;

      timeline.to(target, { x: xOffset, y: yOffset });
    }

    await timeline.to(target, { x: target.x, y: target.y });
  }

  static async MoveAdd(target: DisplayObject, params: STORY.CommandParams) {
    const value = processTargetParams(target, params.Arg3);
    await gsap.to(target, value);
  }

  static async MoveTo(target: DisplayObject, params: STORY.CommandParams) {
    const { duration, x, y } = processParams(params.Arg3);

    await gsap.to(target, {
      duration,
      x: `+=${x || 0}`,
      y: `+=${y || 0}`,
      ease: TweenEffect[params.Arg4 as keyof typeof TweenEffect] || "none"
    });
  }

  static async RotateBy(target: DisplayObject, params: STORY.CommandParams) {
    const { duration, rotation } = processParams(params.Arg3);
    await gsap.to(target, { rotation, duration });
  }
}