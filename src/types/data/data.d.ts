declare namespace DATA {
  /** 武器种 */
  export type Job = {
    id: number;
    name: string;
    /** 能力 */
    ability: number;
    /** 成本 */
    cost: number;
    /** 配置类型 */
    summonType: number;
    minLife: number;
    maxLife: number;
    minPower: number;
    /** 命中类型 */
    hitType: number;
    maxPower: number;
    minDefense: number;
    maxDefense: number;
    minMagicDefense: number;
    maxMagicDefense: number;
    targetNum: number;
    blockNum: number;
    attackRange: number;
    attackSpeed: number;
    attackInterval: number;
    attackCount: number;
    moveCost: number;
    moveSpeed: number;
    /** 装备类型 */
    equipmentPattern: number;
    system_id: number;
  };
  /** 武器种特性 */
  export type JobFeatures = ObjIndex<ABILITIES.Ability>;

  /** 装备类型 */
  export type EquipmentPattern = ObjIndex<string[]>;
  export type Equipment = {
    id: number;
    name: string;
    text: string;
    rarity: number;
    item_id: string;
    max_level: number;
    min_life: number;
    min_power: number;
    min_defense: number;
    min_magic_resist: number;
    min_range: number;
    min_attack_speed: number;
    min_attack_interval: number;
    sale_price: number;
    salable: number;
    smelting_cost_1: string;
    smelting_count_1: number;
    sort_priority: number;
  };

  export type UnitLevelExps = Record<EUnit.Rarity, number[]>;
  /** 素材 */
  export type ItemTemplate = {
    item_id: string;
    display_name: string;
    rarity: EData.Rarity;
    sale_price: number;
    salable: number;
    text: string;
    sort_priority: number;
  };

  export type Picturebook = {
    id: number;
    text: string;
    illustrator: string;
    cv: string;
    icon_text: string;
    startDate: string;
  };

  export type Skin = {
    unit_card_id: number;
    skin_id: number;
    resource_id: number;
    resource_key?: string;
    is_x: number;
    icon: number;
    name: string;
    description: string;
    profile: number;
  };

  export type Tribe = {
    id: number;
    tribe: string;
    ability: number;
    awakedBonusText: string;
  };

  export interface Attach extends Omit<ABILITIES.Ability, "text"> {
    kana: string;
    rarity: EData.Rarity;
    text: string;
  }

  type AttachObtainWayInfo = {
    title: string;
    levelId?: number;
    chapterId?: number;
    shopId?: number;
    imgSrc?: string;
    time?: string;
  };

  export type AttachObtainWays = ObjIndex<{
    dungeon?: AttachObtainWayInfo[];
    mission?: AttachObtainWayInfo[];
    boss?: AttachObtainWayInfo[];
    event?: AttachObtainWayInfo[];
    shop?: AttachObtainWayInfo[];
    "serial code"?: AttachObtainWayInfo[];
    login?: AttachObtainWayInfo[];
    composite?: {
      materials: {
        id: number;
        rarity: string;
      }[];
      combinedsubskill_id: number;
      itemInfo: {
        iconKey: "wallet",
        iconId: string,
        name: string;
        rarity: EData.Rarity;
      };
    };
  }>;

  export type Wallet = {
    name: string;
    wallet_name: string;
    rarity: number;
    exp_point: number;
    text: string;
    sort_priority: number;
  };

  export type Item = {
    item_id: string;
    display_name: string;
    rarity: number;
    sale_price: number;
    salable: number;
    text: string;
    sort_priority: number;
  };

  export type FeatureExpandDescribeText = {
    id: string;
    text: string;
  };

  export interface WeatherEffect extends Omit<ABILITIES.Ability, "text"> {
    text: string;
  }
}