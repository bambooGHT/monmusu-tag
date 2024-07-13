import type { ItemValue } from "@/data";
import type { QuestData } from "@/service/types";
import type { Resistance } from "@/data/calc/getResistance";

export interface Quest {
  id: number;
  chapterInfo: QuestData["chapterInfo"],
  levelList: LevelData[];
  missionList: MissionData[];
  rewardsList: {
    [key in EQuest.RewardsCategory]: RewardsType[key] & RewardsTypeBasic
  };
  currentLevel?: {
    data: LevelData,
    detailedData: LevelDetailedData;
  };
  currentEnemy?: EnemyDeployValue & {
    attributes: {
      raw: ABILITIES.EnemyAttributes;
      revision?: ABILITIES.EnemyAttributes;
    };
    picturebook: DATA.Picturebook;
    resistance: Resistance;
  };
}

export interface LevelData extends Omit<QUEST.Level, "beginningRewardtable" | "highLevelRewardtable" | "cleartable" | "delegatetable"> {
  beginningRewardtable: ItemValue[];
  highLevelRewardtable: ItemValue[];
  cleartable: ItemValue[];
  delegatetable: ItemValue[];
  levelStory: LevelStory;
  iconUrl?: string;
}

export interface MissionData extends Omit<QUEST.Mission, "rewardtable" | "target"> {
  rewardtable: ItemValue[];
}

export interface EventKillReward extends Omit<QUEST.EventKillReward, "reward"> {
  reward: ItemValue;
}

export interface BonusPassReward extends Omit<QUEST.BonusPassReward, "rewards"> {
  rewards: ItemValue[];
}

export interface StarRatingReward extends Omit<QUEST.EventStarRatingReward, "reward"> {
  reward?: ItemValue;
}

export type RewardsTypeBasic = {
  type: EQuest.RewardsCategory;
  title: string;
};

export type RewardsType = {
  [EQuest.RewardsCategory.TYPE_1]: {
    icon: string;
    list: ItemValue[];
    rawList: QUEST.Shop[];
  },
  [EQuest.RewardsCategory.TYPE_2]: {
    character?: UNIT.Character;
    list: StarRatingReward[];
    rawList: QUEST.EventStarRatingReward[];
  },
  [EQuest.RewardsCategory.TYPE_3]: {
    list: ObjIndex<EventKillReward[]>;
    rawList: QUEST.EventKillReward[];
  };
  [EQuest.RewardsCategory.TYPE_4]: {
    info: QUEST.SealedChara;
    character: UNIT.Character;
    list: { category: string; list: { cost: string, value: string; }[]; }[];
    rawList: QUEST.SealedCharaModsReward[];
  };
  [EQuest.RewardsCategory.TYPE_5]: {
    list: [BonusPassReward, BonusPassReward][];
    rawList: QUEST.BonusPassReward[];
  };
};
export type BattleUnit = { id?: number, unit: UNIT.Character; };

export type LevelDetailedData = {
  mapData: LevelMap.Map,
  battleMemberList?: (QUEST.BattleMember & BattleUnit)[];
  battleNPCList?: (QUEST.BattleNpc & BattleUnit)[];
  attachList?: Pick<DATA.Attach, "id" | "text" | "name">[];
  battleEventList: ObjIndex<QUEST.BattleEvent>;
  eventHelpInfoList: ObjIndex<UNIT.Help>;
  enemyBuffMenu: QUEST.EnemyBuffMenu;
  enemyDeployCount: EnemyDeployCount;
  mapGroundSources: string[];
  timelineList: Timeline[];
  needUnitopen?: UNIT.Character;
};
export type EnemyDeployValue = {
  unit: UNIT.Enemy;
  count: number;
};

export type EnemyDeployCount = {
  enemyDeployRoutesCount: ObjIndex<EnemyDeployValue[]>;
  enemyDeployCount: EnemyDeployValue[];
  total: number;
};

export type LevelStory = {
  "before level start"?: string,
  "before battle"?: string,
  "after battle"?: string,
  "after level end"?: string,
};

type Url = string;
type Text = string;

export type LevelTimelineEvent = {
  title: string;
  time: number;
  icon?: Url;
  units?: (UNIT.BeastGod | UNIT.Character)[];
  text?: (Url | Text)[];
  story?: {
    id: number,
    name: string;
  };
  values?: {
    name?: string;
    value: number;
    rang: string;
    triggerTiming: string;
  }[];
};

export type LevelTimelineEnemyDeploy = {
  time: number;
  list: {
    enemy: UNIT.Enemy;
    value: LevelMap.Deploy;
    count: number;
  }[];
};

export interface Timeline extends Omit<LevelMap.DeployEntrie, "events" | "deploys" | "auto"> {
  autoBoot: boolean,
  enemyTotal: number;
  events: LevelTimelineEvent[];
  deploys: LevelTimelineEnemyDeploy[];
};