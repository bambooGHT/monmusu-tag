declare namespace UNIT {
  /** 角色 */
  export type Character = {
    id: number;
    /** 昵称 */
    nickname: string;
    /** 名字 */
    charaName: string;
    /** 平假 */
    kana: string;
    /** 全名 */
    text: string;
    /** 属性 */
    element: EUnit.Attr;
    /** hp */
    life: number;
    /** 力量 */
    power: number;
    /** 物理防御 */
    defense: number;
    /** 魔法防御 */
    magicDefense: number;
    /** 能力 */
    ability: number[];
    gender: number;
    mainTribe: number;
    /** 特征 */
    trait_id_array: number[];
    /** 移动类型 */
    receiveType: number;
    /** 关联id */
    resource: number;
    /** 描述id */
    picture: number;
    /** 稀有度 */
    rarityId: EUnit.Rarity;
    /** 特性 */
    classId: number;
    /** 技能1 */
    skillId1: number;
    /** 技能2 */
    skillId2: number;
    /** 技能3 */
    skillId3: number;
    /** 成本 */
    cost: number;
    /** 潜在觉醒1 */
    awakingAbilityId1: number;
    /** 潜在觉醒2 */
    awakingAbilityId2: number;
    /** 潜在觉醒3 */
    awakingAbilityId3: number;
    /** 潜在觉醒4 */
    awakingAbilityId4: number;
    /** 潜在觉醒5 */
    awakingAbilityId5: number;
    awakingCost1: number;
  };
  /** 觉醒效果 */
  export type Awakenings = ABILITIES.Ability;
  /** 种族特性 */
  export type RaceFeature = ABILITIES.Ability;
  /** 技能 */
  export interface Skill extends ABILITIES.Ability {
    maxLevel: number,
    minCoolTime: number,
    maxCoolTime: number,
    minDurationTime: number,
    maxDurationTime: number,
  }
  //专属武器
  export type UniqueWeapon = {
    uw_id: number;
    card_id: number;
    name: string;
    level: number;
    life: number;
    power: number;
    defense: number;
    magic_resist: number;
    range: number;
    attack_speed: number;
    attack_interval: number;
  };
  //专属武器能力
  export interface UniqueWeaponAbility extends Omit<ABILITIES.Ability, "text"> {
    text: string;
  }
  export type UniqueWeaponData = { list: UniqueWeapon[]; } & { ability: UniqueWeaponAbility; };
}

declare namespace UNIT {
  export type Token = Character;

  /** token数据 */
  export interface TokenData extends Omit<UNIT.BomData, "recoverCostMaxMagni" | "recoverCost"> {
    cost: number;
    isAttack: number;
    resource?: number;
  }
}
