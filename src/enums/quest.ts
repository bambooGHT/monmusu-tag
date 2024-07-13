namespace EQuest {
  export enum RewardsCategory {
    /** 商店 素材兑换报酬 */
    TYPE_1 = "1",
    /** 仅活动 总星数(包含角色)报酬 */
    TYPE_2 = "2",
    /** 仅活动 击杀数量报酬 */
    TYPE_3 = "3",
    /** 仅活动 角色能力选择,活动结束后获得该角色以及对应能力报酬 */
    TYPE_4 = "4",
    /** 仅活动 bonus Pass 报酬 */
    TYPE_5 = "5"
  }

  export enum KillRewardKey {
    "all player kills",
    "cumulative kills",
    "max kills"
  }

  export enum SealedCharaModType {
    "level" = 1,
    "skill level" = 2,
    "awakening" = 3
  }
}
(<any>window).EQuest = EQuest;
