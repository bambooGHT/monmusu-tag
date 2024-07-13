import type { BLEND_MODES } from "pixi.js";

export type CoordinateTuple = LevelMap.CoordinateTuple;
export type DimensionTuple = LevelMap.CoordinateTuple;
export type SizeTuple = LevelMap.CoordinateTuple;
export type CoordinateObject = LevelMap.CoordinateObject;
export type DrawIcon = {
  src: string;
  sizeRatio?: SizeTuple;
  coordinate?: CoordinateObject;
  blendMode?: BLEND_MODES;
};