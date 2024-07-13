/** 单位稀有度 */
export const unitRarity: UNIT.Raritys = {
  "1853849455": {
    idName: "Unknown",
    name: "不明",
    skillFirstRate: 70
  },
  "82": {
    idName: "R",
    name: "コモン",
    skillFirstRate: 70
  },
  "18514": {
    idName: "HR",
    name: "レア",
    skillFirstRate: 60
  },
  "21330": {
    idName: "SR",
    name: "エピック",
    skillFirstRate: 50
  },
  "5460818": {
    idName: "SSR",
    name: "レジェンド",
    skillFirstRate: 30
  }
};

export const gender: ObjIndex<string> = {
  0: '♂️',
  1: '♀️',
  3: "?",
};

export const moveType: ObjIndex<string> = {
  1: "地上",
  2: "飛行"
};
/** 屬性 */;
export const attr = {
  "1": "無",
  "2": "火",
  "3": "水",
  "4": "風",
  "5": "光",
  "6": "闇",
  "7": "地"
};
/** 命中類型 */;
export const hitType: ObjIndex<string> = {
  "0": "null",
  "1": "物理",
  "2": "魔法",
  "3": "貫通",
  "4": "回復",
};