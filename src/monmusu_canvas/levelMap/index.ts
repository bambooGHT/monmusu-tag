import type { CoordinateObject, CoordinateTuple, SizeTuple } from "./utils/types";
import type { NpcList } from "./mapEntity/mapEntityTypes";
import type { Sprite } from "pixi.js";
import type Spine2d from "@/pixi1/spine2d";

import PixiApp from "@/pixi1/pixiApp";
import { Zoomable } from "@/pixi1/utils";
import { MapConfig, MapDesignConfig } from "./config";
import { MapEntity } from "./mapEntity/mapEntity";
import { getMapIconUrl } from "@/data";
import { MapRoute } from "./mapEntity/mapRoute";
import { MapSummonPoint } from "./mapEntity/mapSummonPoint";
import GraphicsCreator from "./utils/graphicsCreator";

type loadMapParams = {
  routes: LevelMap.Route[];
  summonPoints: LevelMap.SummonPoint[];
  mapGroundSources: string[];
  sizeRatio: CoordinateTuple;
  unitScaleRatio: CoordinateTuple;
  corePos: CoordinateObject[];
  npcList?: (Omit<NpcList[0], "summonPointPos"> & { summonPoint: number; })[];
};

type MapEntityType = {
  cores?: Sprite[];
  npcs?: Spine2d[];
  bgs?: Sprite[];
  route: MapRoute;
  summonPoint: MapSummonPoint;
};

export class LevelMapControl {
  private pixiApp: PixiApp;
  private mapEntity = {} as MapEntityType;
  private mapParams: loadMapParams | null = null;
  private mapDesignConfig: MapDesignConfig;

  readonly mapConfig: MapConfig;
  zoomable: Zoomable | undefined;

  get renderer() {
    return this.pixiApp.renderer;
  }

  constructor() {
    const app = new PixiApp({
      width: EMap.MapBase.MAP_WIDTH,
      height: EMap.MapBase.MAP_HEIGHT,
      antialias: true,
      backgroundAlpha: 0,
    }, 4);

    const mapConfig = new MapConfig();
    const mapDesignConfig = new MapDesignConfig(EMap.MapBase.MAP_WIDTH, EMap.MapBase.MAP_HEIGHT, EMap.MapBase.FPS);
    const mapRoute = new MapRoute(mapDesignConfig);
    const mapSummonPoint = new MapSummonPoint(getMapIconUrl.summonType);

    this.pixiApp = app;
    this.mapDesignConfig = mapDesignConfig;
    this.mapConfig = mapConfig;
    this.mapEntity.route = mapRoute;
    this.mapEntity.summonPoint = mapSummonPoint;

    app.addChildTo(3, mapSummonPoint.view);
    app.addChildTo(3, mapRoute.view);
    this.toggleZoom(mapConfig.isZoom);
  }

  async loadMap(mapParams: loadMapParams) {
    const { mapConfig } = this;
    this.mapParams = mapParams;
    mapConfig.isDrawSummonPoint && await LevelMapControl.preLoadHighlightIcon(mapParams.summonPoints);

    await this.loadMapGround();
    await this.updateRoute(mapConfig.isDrawRoute);
    await this.updateSummonPoint(mapConfig.isDrawSummonPoint);
    await this.updateCore(mapConfig.isDrawCore);
    await this.updateNpc(mapConfig.isDrawNpc);
  }

  drawRoutePath(...ids: number[]) {
    ids.forEach(p => this.mapEntity.route.drawRoutePath(p));
  }

  clearRoutePath() {
    this.mapEntity.route.clearRoutePath();
  }

  async loadMapGround() {
    const { mapParams, pixiApp, mapEntity, mapDesignConfig } = this;
    const [bottomUrl, ...urls] = mapParams!.mapGroundSources;

    const bg1 = await MapEntity.drawBg(bottomUrl, mapDesignConfig);
    const bg2 = await Promise.all(urls.map(async p => await MapEntity.drawBg(p, mapDesignConfig)));

    pixiApp.addChildTo(0, bg1);
    bg2[0] && pixiApp.addChildTo(2, ...bg2);
    mapEntity.bgs = [bg1, ...bg2];

  }

  async updateRoute(is: boolean) {
    const { mapEntity: { route }, mapParams, mapConfig } = this;
    mapConfig.isDrawRoute = is;
    if (!mapParams) return;

    is ? route.draw(mapParams.routes) : route.destroy();
  }

  async updateSummonPoint(is: boolean) {
    const { mapParams, mapConfig, mapEntity: { summonPoint } } = this;
    mapConfig.isDrawSummonPoint = is;

    if (!mapParams) return;

    is ? await summonPoint.draw(mapParams.summonPoints, mapParams.sizeRatio)
      : summonPoint.destroy();
  }

  async updateCore(is: boolean) {
    const { mapParams, mapConfig, mapEntity, pixiApp } = this;
    mapConfig.isDrawCore = is;

    if (!mapParams) return;
    if (!is && mapEntity.cores) {
      PixiApp.destroy(mapEntity.cores);
      mapEntity.cores = undefined;
      return;
    }

    const icon = getMapIconUrl.core();
    const cores = await MapEntity.drawCoreLife(mapParams.corePos, icon, mapParams.sizeRatio);
    pixiApp.addChildTo(1, ...cores);
    mapEntity.cores = cores;
  }

  async updateNpc(is: boolean) {
    const { mapParams, mapConfig, mapEntity } = this;
    mapConfig.isDrawNpc = is;
    if (!mapParams) return;
    if (!is && mapEntity.npcs) {
      mapEntity.npcs.forEach(p => p.destroy());
      mapEntity.npcs = undefined;
      return;
    }

    if (mapParams.npcList) {
      const npcList = mapParams.npcList.map(({ summonPoint, ...item }) => {
        const { point } = mapParams.summonPoints.find(p => p.id === summonPoint)!;
        return { ...item, summonPointPos: [point.x, point.y] as SizeTuple };
      });
      const npcs = await MapEntity.drawNpc(npcList, mapParams.unitScaleRatio);
      mapEntity.npcs = npcs;
    }
  };

  toggleZoom(is: boolean) {
    const { mapDesignConfig } = this;
    if (is) {
      this.zoomable = new Zoomable(this.pixiApp.stage, {
        size: { width: mapDesignConfig.width, height: mapDesignConfig.height },
        move: true
      });
      return;
    }
    this.zoomable?.clear();
    this.zoomable = undefined;
  }

  destroy() {
    const { mapEntity } = this;

    mapEntity.cores && PixiApp.destroy(mapEntity.cores);
    mapEntity.npcs?.forEach(p => p.destroy());
    mapEntity.bgs && PixiApp.destroy(mapEntity.bgs);
    mapEntity.route.destroy();
    mapEntity.summonPoint.destroy();

    this.mapEntity = {
      route: mapEntity.route,
      summonPoint: mapEntity.summonPoint
    };

    this.mapParams = null;
  }

  static async preLoadHighlightIcon(summonPoints: LevelMap.SummonPoint[]) {

    await Promise.all([...new Set(summonPoints.map(p => `${p.summonType}-${p.attr}`))].map(async (p) => {
      const [type, attr] = p.split("-");
      const [icon1, icon2] = getMapIconUrl.summonType(+type, +attr).highlightIcon;
      await GraphicsCreator.preLoadIcon(icon1);
      await GraphicsCreator.preLoadIcon(icon2);
    }));
  }
}
