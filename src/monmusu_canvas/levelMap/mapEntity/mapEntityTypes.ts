import type { Container, Graphics, Sprite } from "pixi.js";
import type { PathStyle, RouteStyle } from "../config";
import type { CoordinateObject, CoordinateTuple } from "../utils/types";
import type { MapRoutePath } from "./mapRoute/mapRoutePath";
import type CalcTools from "../utils/calcTools";

export interface MapDrawable {
  view: Container;
  draw(...ars: any[]): any;
  destroy(): any;
}

export type PointData = ReturnType<typeof CalcTools.nextPointDistance<LevelMap.Point>>;

export type GetSummonType = (type: EMap.SummonType, attr: number) => IconUrl;

export interface RemovablePosGrpup {
  removableIds: Record<string, number[]>;
  positions: Record<string, CoordinateObject>;
};

export type SummonPointData = Record<string, {
  id: number;
  el: Sprite;
  summonType: EMap.SummonType,
  attr: EUnit.Attr;
}>;

export type NpcList = {
  resource: number,
  summonPointPos: CoordinateTuple;
  lookAtLeft: 0 | 1;
}[];

export type RouteData = {
  id: number;
  el: Graphics;
  styleRoute: RouteStyle;
  stylePath: PathStyle;
  routePath?: MapRoutePath;
};

export type IconUrl = {
  icon: string;
  highlightIcon: string[];
};