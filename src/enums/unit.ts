namespace EUnit {
  /** 稀有度 */
  export enum Rarity {
    Unknown = 1853849455,
    R = 82,
    HR = 18514,
    SR = 21330,
    SSR = 5460818,
  }
  /** 属性 */
  export enum Attr {
    NULL = 1,
    FIRE = 2,
    WATER = 3,
    WIND = 4,
    LIGHT = 5,
    DARK = 6,
    EARTH = 7,
  }
  /** 阶级阶段 */
  export enum CLASS_PHASE {
    CLASS1 = 30,
    CLASS2 = 60,
    CLASS3 = 90,
    CLASS4 = 120,
    CLASS5 = 150
  }
  /** 阶级系数 */
  export enum CLASS_COEFFICIENT {
    CHARACTER = 30,
    TOKEN = 150
  }
  /** 等级 */
  export enum CLASS_LEVEL {
    MIN = 1,
    MAX = 150,
  }
  /** 能力索引 */
  export enum ABILITY_INDEX {
    MIN,
    MAX = 4
  }
  /** 能力等级 */
  export enum ABILITY_LEVEL {
    MIN,
    MAX = 4
  }
  /** 技能索引 */
  export enum SKILL_INDEX {
    MIN,
    MAX = 2
  }
  /** 技能等级 */
  export enum UNIQUEWEAPON_LEVEL {
    MIN,
    MAX = 10
  }
  /** 技能等级 */
  export enum SKILL_LEVEL {
    MIN,
    MAX = 4
  }
  /** 兽神技能等级 */
  export enum BEASTGOD_SKILL_LEVEL {
    MIN,
    MAX = 9
  }
}

(<any>window).EUnit = EUnit;