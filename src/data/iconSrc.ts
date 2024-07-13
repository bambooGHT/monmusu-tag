import type { Face, IconItem, iconBasePath } from "./types";

const basePath = {
  job: "/icon/icon_job/Icon_Job_",
  wallet: "/icon/wallet/",
  iconFace: "/icon/icon_face/Icon_Face_Frame_",
  iconFaceBg: "/icon/icon_face/Icon_Face_Thumbnail_Bg_",
  iconItem: "/icon/icon_item/Icon_Item_Frame_",
  iconAttach: "/icon/rarity_logo/Rarity_LogoSkill_",
  equipment: "/icon/equipment/eq_",
  uniqueWeapon: "/icon/uniqueWeapon/uw_",
  summonPoint: "/summonPoint/summon_type",
  core: "/core/Btl_Core_",
  attr: "/icon/icon_type/Icon_Type_",
  summon: "/icon/summon_type/Summon_Type_",
  rarity: "/icon/rarity_logo/Rarity_Logo_"
};

export enum IconName {
  wallet = "wallet",
  equipment = "equipment",
  attachable = "attachable",
  uniqueWeapon = "uniqueWeapon",
  job = "job",
  unit = "unit",
  unit_s = "unit_s",
  weather = "weather",
  // panelInfoimage = "panelInfoimage",
  attr = "attr",
  summon = "summon"
}

export const iconItemKey: Record<EData.Rarity, string> = {
  "17201": "C1",
  "21041": "R1",
  "5460529": "SR1",
  "1397969457": "SSR1"
};

/** 单位稀有度边框/背景 */
const getIconFace = (rarity: EUnit.Rarity): Face => {
  const { Rarity } = EUnit;
  if (rarity === Rarity.Unknown) {
    rarity = Rarity.R;
  }
  const frame = basePath.iconFace + Rarity[rarity];
  const bg = basePath.iconFaceBg;
  return {
    "frame": `${frame}.png`,
    "beastGod": `${frame}_BeastGod.png`,
    "unit": `${frame}_Deck.png`,
    "bg": `${bg}1.png`,
    "unitbg": `${bg}0_BeastGod.png`,
  };
};


/** 道具稀有度边框 */
const getIconItem = (rarity: EData.Rarity): IconItem => {
  return {
    "frame": `${basePath.iconItem}${iconItemKey[rarity]}.png`,
    "bg": `${basePath.iconItem}bg_${iconItemKey[rarity]}.png`,

  };
};
/** 插件图标 */
const getIconAttach = (rarity: EData.Rarity): string => {
  return `${basePath.iconAttach}${iconItemKey[rarity]}.png`;
};
/** 稀有度 */
const getIconRarity = (rarity: EUnit.Rarity) => {
  return `${basePath.rarity + EUnit.Rarity[rarity]}.png`;
};


export const getIcon: Record<IconName, iconBasePath> = {
  /** 道具图标 */
  "wallet": (id) => {
    return `${basePath.wallet + id}.png`;
  },
  /** 武器图标 */
  "equipment": (id) => {
    return `${basePath.equipment + id}.png`;
  },
  /** 武器种类图标 */
  "job": (id) => {
    return `${basePath.job + id}.png`;
  },
  /** 插件图标 */
  "attachable": () => {
    return "/icon/attachable/sub_skill_C1.png";
  },
  /** 专属武器图标 */
  "uniqueWeapon": (id) => {
    return `${basePath.uniqueWeapon + id}.png`;
  },
  /** 单位图标 */
  "unit": (id) => {
    return `/character/character/ch_${id}/icon_${id}_0/icon_${id}_0.png`;
  },
  /** 单位图标s */
  "unit_s": (id) => {
    return `/character/character/ch_${id}/icon_${id}_0/icon_${id}_0_s.png`;
  },
  /** 天气图标 */
  "weather": (id) => {
    return `/weather/we_${id}/we_${id}_Icon.png`;
  },
  /** 新手7日任务图标 */
  // "panelInfoimage": (id) => {
  //   return `/panelInfoimage/${id}.png`;
  // },
  /** 属性图标 */
  "attr": (id) => {
    return `${basePath.attr + id}.png`;
  },
  /** 配置类型图标 */
  "summon": (id) => {
    return `${basePath.summon + id}.png`;
  },
};

const getMapIconUrl = {
  summonType(type: EMap.SummonType, attr: number) {
    const icon = `${basePath.summonPoint}${type}_${attr}_0.png`;
    const highlightIcon = [`${basePath.summonPoint}${type}_${attr}_1.png`, `${basePath.summonPoint}${type}_${attr}_2.png`];
    return { icon, highlightIcon };
  },
  core() {
    const icon = `${basePath.core}1.png`;
    const highlightIcon = [`${basePath.core}2.png`];
    return { icon, highlightIcon };
  }
};
export {
  getIconFace,
  getIconItem,
  getIconAttach,
  getIconRarity,
  basePath,
  getMapIconUrl
};