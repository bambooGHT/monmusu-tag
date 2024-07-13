namespace EMap {

  export enum MapBase {
    /** 帧率 */
    FPS = 30,
    /** 地图宽 */
    MAP_WIDTH = 2272,
    /** 地图高 */
    MAP_HEIGHT = 1280,
  }
  /** 召唤点类型 */
  export enum SummonType {
    /** 近战 */
    MELEE = 1,
    /** 远程 */
    RANGED = 2,
    /** 远近 */
    All = 3,
    MOVE = 4
  }
  /** 地图尺寸 */
  export enum Size {
    None,
    Small,
    middle,
    Large,
    Max
  }
}
(<any>window).EMap = EMap;
