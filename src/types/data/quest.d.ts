declare namespace QUEST {
  /** 报酬类型1 */
  export interface Reward {
    /** 类别 */
    m_walletCategory: string;
    m_walletName: string;
    m_count: number;
    m_probability?: number;
    m_firstProbability?: number;
  }
  /** 商店 */
  export type Shop = {
    id: number;
    name: string;
    sort_priority: number;
    shopCategory: number;
    text: string;
    price: number;
    price_name: string;
    shopItems: Reward[],
    buylimit: number;
    tab_category: number,
    startDate: string;
    endDate: string;
  };

  export type QuestOther = {
    id: number;
    title: string;
  };

  export type Main = {
    id: number;
    target_quest_id: number;
    before_message: string;
    after_message: string;
  };

  export type Boss = {
    id: number;
    name: string;
    src: string;
    questIds: [number, number],
    openTime: string;
    closeTime: string;
    text: "";
  };

  export type Dungeon = {
    id: number;
    name: string;
    questIds: [number, number];
  };
  /** 活动 */
  export type EventList = {
    id: number;
    /** 活动类型 */
    event_type: number;
    name: string;
    /** 关卡对应id */
    chapter: number;
    src: string;
    x_src?: string;
    shop_id: number;
    open_time: string;
    close_time: string;
    /** 击杀数量报酬 */
    event_dataTable_id: number;
    banner_src: string;
    banner_src2: string;
    /** 活动描述 */
    text?: string;
  };

  export type Level = {
    /** 关卡id ( 地图id ) */
    id: number;
    /** 关卡名字 */
    name: string;
    /** 关卡简介 */
    text: string;
    /** 关卡类型 */
    category: number;
    /** 增益效果id */
    buffId?: number;
    /** 是否为无尽模式 */
    isEndless: number;
    /** 关卡所属的id */
    chapter: number;
    /** 战斗开始前剧情类别id */
    bfr_btl_story_id?: string;
    /** 战斗开始前剧情章节id */
    bfr_btl_story_chapter_id?: string;
    /** 战斗结束后剧情类别id */
    afr_btl_story_id?: string;
    /** 战斗结束后剧情章节id */
    afr_btl_story_chapter_id?: string,
    /** 关卡开始前剧情类别id */
    before_story_id?: string;
    /** 关卡开始前剧情章节id */
    before_story_chapter_id?: string;
    /** 关卡结束后剧情类别id */
    after_story_id?: string;
    /** 关卡结束后剧情章节id */
    after_story_chapter_id?: string;
    /** 敌人属性倍率 */
    enemyRevision: number;
    /** 核心生命值 */
    coreLife: number;
    /** 出击人数 */
    sortieCount: number;
    /** 出击消耗的体力 */
    mana: number;
    /** 出击消耗的名字 为空表示使用体力 */
    consumption_name?: string;
    /** 可放置的NPC */
    battleMemberId?: number;
    /** 可使用的NPC */
    battleNPCId?: number;
    /** 关卡限定时间 */
    loseTimeLimitFrame?: number;
    /** 需要单位开启 */
    limitMemberId?: number;
    /** 开放时间 */
    termId?: string;
    /** 关卡开始时间 */
    openTime?: string;
    /** 关卡结束时间 */
    closeTime?: string;
    /** 星期几开放 */
    unlockWeeks: number[];
    /** 推荐等级 */
    recommendLevel: number;
    /** 关卡地图 */
    mapDataIndex: number;
    /** bgm索引 */
    bgmIndex: number;
    /** 玩家经验 */
    playerExp: number;
    /** 人物经验 */
    unitExp: number;
    /** 金币 */
    gold: number;
    /** 插件列表id */
    subSkillPrizeTableId: string;
    /** 初次通关报酬 */
    beginningRewardtable: Reward[];
    /** 初次通关高级报酬 */
    highLevelRewardtable: Reward[];
    /** 通关报酬 */
    cleartable: Reward[];
    /** 委托报酬 */
    delegatetable: Reward[];
  };
  /** 任务 */
  export type Mission = {
    id: number,
    text: string;
    target: number;
    rewardtable: Reward[];
  };
  /** 活动星数报酬 */
  export type EventStarRatingReward = {
    id: number;
    event_id: number;
    card_id: number;
    star_count: number;
    reward: Reward;
    value: number;
    list_text: string;
  };

  /** 活动击杀报酬 */
  export type EventKillReward = {
    id: number;
    reward_table_id: number;
    target_num: number;
    reward_kind: number;
    reward: Reward;
  };

  export type BonusPassReward = {
    id: number;
    pass_id: number;
    track: 1 | 2;
    box_message: string;
    rewards: Reward[];
  };

  export type SealedChara = {
    event_id: number;
    wallet: string;
    reward_card_id: number;
    rank1_pt: number;
    rank2_pt: number;
    rank3_pt: number;
  };

  export type SealedCharaModsReward = {
    event_id: number;
    mod_type: EQuest.SealedCharaModType;
    mod_val: number;
    mod_val2: number;
    cost: number;
    activate_total_cost: number;
  };

  export interface BattleMember {
    cardId: number;
    level: number;
    exSkillLevel: number;
    IsToken: 0 | 1;
  }

  export interface BattleNpc extends Omit<BattleMember, "IsToken"> {
    /** 召唤点id */
    summonPointId: number;
    /** 禁止移动 */
    moveBan: 0 | 1;
    /** 向左看 */
    lookAtLeft: 0 | 1;
    /** 占核心生命 */
    deadCoreDamage: 0 | 1;
  }

  export interface BattleEvent extends Omit<ABILITIES.Ability, "text"> {
    text: string;
  }
  /** 敌人buff菜单 */
  export type EnemyBuffMenu = {
    id: number;
    quest_id: number;
    type: number;
    name: string;
    description: string;
    rank: number;
  }[];
}