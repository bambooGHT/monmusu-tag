declare namespace UNIT {
  /** 地图列表 */
  export type EnemyEntranceMaps = {
    name: string;
    text: string;
    category: string;
    chapterId: number;
    levelId: number;
    enemyRevision: number;
  }[];

  /** 帮助文本 */
  export type Help = {
    id: number;
    helpId: string;
    title: string;
    body: string[];
  };

  /** 敌人 */
  export type Enemy = {
    id: number;
    /** 昵称 */
    nickname: string;
    /** 名字 */
    charaName: string;
    /** 平假 */
    kana: string;
    /** 全名 */
    text: string;
    element: EUnit.Attr;
    life: number;
    power: number;
    defense: number;
    magicDefense: number;
    /** 能力 */
    ability: number[];
    gender: number;
    mainTribe: number;
    /** 关联id */
    resource: number;
    /** 描述id */
    picture: number;
    /** 移动类型 */
    attackRange: number;
    targetNum: number;
    /** 移动类型 */
    attackSpeed: number;
    /** 移动类型 */
    attackInterval: number;
    /** 移动类型 */
    moveType: number;
    /** 命中类型 */
    hitType: number,
    /** 移动速度 */
    moveSpeed: number;
    /** 攻击速度 */
    attackCount: number;
    /** 能力提示文本 */
    helpWindowId: number;
    /** 眩晕抗性 */
    stunResistance: number;
    /** 石化抗性 */
    petrifactionResistance: number;
    /** 毒抗性 */
    poisonResistance: number;
    /** 击飞抗性 */
    blowOffResistance: number;
    /** 击退抗性 */
    knockBackResistance: number;
    /** 烧伤抗性 */
    burnResistance: number;
    scratchResistance: number;
    /** 冰冻抗性 */
    frozenResistance: number;
    /** 基础状态抗性 */
    baseStatusResistance: number;
    /** 移动速度抗性 */
    moveSpeedResistance: number;
    /** 攻击速度抗性 */
    attackSpeedResistance: number;
    /** 攻击间隔抗性 */
    attackIntervalResistance: number;
  };
}