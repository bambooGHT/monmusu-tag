declare namespace ABILITIES {

  export type AttributeNames = keyof Attributes;
  export type Attributes = Unfold<{
    HP: number;
    /** 攻擊力 */
    ATK: number;
    /** 防禦 */
    DEF: number;
    /** 魔法防禦 */
    MDEF: number;
    /** 阻擋 */
    Block: number;
    /** 範圍 */
    Range: number;
    /** 攻擊速度 */
    ASPD: number;
    /** 攻擊數量 */
    Targets: number | string;
    /** 攻擊後搖 */
    ACD: number;
    /** 放置成本 */
    COST: number;
    /** 移動速度 */
    SPD: number;
    /** 移動成本 */
    MC: number;
    /** 暴击率 */
    CRIT_RATE?: number | string;
    /** 暴击伤害 */
    CRIT_DAMAGE?: number | string;
  }>;

  export type EqAttributes = Omit<Attributes,
    "Block" | "COST" | "MC" | "SPD" | "Targets">;

  export type EnemyAttributes = Omit<ABILITIES.Attributes, "Block" | "MC" | "COST">;

  export type TalentIndex = number[];

  type text = string[] | [string, string][] | [string, TalentIndex][] | [string][];

  export type Ability = {
    id: number;
    name: string;
    /** 能力文本 */
    text: [text, number[]];
    talentList: TalentList;
  };
  export type ActiveOption = "" | "!" | ">=" | "<=";

  /** 能力数据 */
  export type TalentList = {
    talentId: number;
    timing: number;
    range: number;
    param: number[];
    maxParam: number[];
    triggerData: { type: number, value: number[]; option: string[]; }[];
    activeData: { type: number, value: number[]; option: string[]; }[];
  }[];
}