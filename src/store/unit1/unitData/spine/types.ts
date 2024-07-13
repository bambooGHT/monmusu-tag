import type { IAnimation, ITimeline } from "pixi-spine";

export type UnitSpineData = {
  spineResource: UNIT.SpineResource;
  currentSpineType?: UNIT.SpineType;
  spineLoadedCount: number;
  spineAnimations: IAnimation<ITimeline>[];
  currentAnimation: string;
};