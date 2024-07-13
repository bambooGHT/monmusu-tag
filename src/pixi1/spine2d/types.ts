import type { ISkeletonData, TextureAtlas } from "pixi-spine";

export type DebugDraws = {
  drawMeshHull: boolean;
  drawMeshTriangles: boolean;
  drawBones: boolean;
  drawPaths: boolean;
  drawBoundingBoxes: boolean;
  drawClipping: boolean;
  drawRegionAttachments: boolean;
};

export type LoadOptions = {
  animation?: boolean | string;
  animationLoop?: boolean;
  event?: boolean,
}

export type SpineData = { spineData: ISkeletonData, spineAtlas: TextureAtlas; };
