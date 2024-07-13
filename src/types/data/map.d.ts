declare namespace LevelMap {

  export type Map = {
    id: number;
    mapSize: number;
    /** 默认缩放比例 */
    sizeRatio: CoordinateTuple;
    /** 单位缩放比例 */
    unitScaleRatio: CoordinateTuple;
    groundId: number;
    corePos: CoordinateObject[];
    routes: Route[];
    summonPoints: SummonPoint[];
    deployEntries: DeployEntrie[];
  };

  export type CoordinateTuple = [number, number];

  export interface CoordinateObject { x: number; y: number; }

  export interface Point extends CoordinateObject {
    tag: string;
    warp: number;
    wait: number;
  }
  /** 敌人路由 */
  export type Route = {
    id: number;
    points: Point[];
  };

  /** 召唤点 */
  export type SummonPoint = {
    id: number;
    /** 召唤点类型 */
    summonType: EMap.SummonType;
    point: Point;
    edge: number[];
    attr: number;
  };

  /** 敌人部署入口 */
  export type DeployEntrie = {
    /** 条目id */
    id: number;
    /** 开始时间 */
    startTime: number;
    /** 自动开始事件 */
    auto: number;
    nextEntryId: number;
    events: Event[];
    deploys: Deploy[];
    callCount: number;
  };

  export type Event = {
    /** id */
    id: number;
    /** 事件id */
    eventId: number;
    /** 开始时间 */
    timing: number;
    /** 标志 */
    justFlag: number;
    /** 需要开始 */
    requiredStart: number;
  };

  export type Deploy = {
    /** id */
    id: number;
    /** 时间 */
    timing: number;
    /** 路由 */
    routeId: number;
    /** enemyId */
    appId: number;
    /** 是否需要销毁 */
    noNeedToDestroyFlag: number;
    /** 预兆类型 */
    omenType: number;
    /** 是否为boss */
    bossFlag: number;
    /** 动画 */
    appAnimFlag: number;
    /** 是否无敌 */
    appInvincibleFlag: number;
  };
}