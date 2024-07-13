export type TokenData = ObjIndex<UNIT.TokenData>;

export type EquipmentData = {
  equipment: ObjIndex<DATA.Equipment>;
  equipmentPattern: DATA.EquipmentPattern;
};

export type JobData = {
  /** 武器种 */
  job: ObjIndex<DATA.Job>;
  /** 武器种特性 */
  jobFeatures: DATA.JobFeatures;
};

export type AttachObtainWays = {
  shopData: ObjIndex<QUEST.Shop>;
  attachObtainWays: DATA.AttachObtainWays;
};

export type News = {
  "id": number,
  "prw1": number,
  "prw2": number,
  /** 日期 */
  "postedAt": string,
  /** 类型标签 */
  "tag": number,
  /** 标题 */
  "title": string,
  /** 信息 */
  "message": string;
};

export type SearchResult = {
  skills: (UNIT.Skill | UNIT.Skill[])[];
  raceFeatures: ABILITIES.Ability[];
};

export type SearchParams = { skill: string, raceFeature: string; };

export type Coll = "srcAnnounceimage" | "srcGallery" | "srcBgm" | "srcBoss" | "srcWallet" | "srcUnitvoices" | "srcShop";

export type Gallery = {
  /** 图片预览 */
  base64: string;
  /** 图片链接 */
  src: string;
  id: number;
  /** 时间 */
  date: string;
  /** 头部标题 */
  header_title: string;
  /** 标题 */
  title: string;
  sort_order: number;
};

export type GalleryData = {
  list: [Gallery, Gallery][],
  total: number;
};

export type Announce = {
  /** 路径 */
  "src": string;
  "id": number,
  /** 开始日期 */
  "start_date": string,
  /** 结束日期 */
  "end_date": string,
};

export type CarouselList = {
  character: string;
  character1: string;
  thumbnail: string;
  thumbnail_off: string;
};

export interface UnitOriginalAbilitiesDataParams {
  id: number,
  unitType: UNIT.UnitType;
  tribeId: number;
  picture: number;
  skillIds?: number[];
  helpId?: number;
  abilityIdList?: number[];
}

export type unitList = {
  beastGod: ObjIndex<UNIT.BeastGod>;
  character: ObjIndex<UNIT.Character>;
  token: ObjIndex<UNIT.Token>;
  enemy: ObjIndex<UNIT.Enemy>;
};

export type UnitOriginalAbilitiesData = {
  raceFeature: UNIT.RaceFeature;
  uniqueWeapon: UNIT.UniqueWeaponData;
  skill: UNIT.Skill[];
  skin: DATA.Skin[];
  associationIds?: number[];
  enemyEntranceMaps?: UNIT.EnemyEntranceMaps;
  help: UNIT.Help;
  abilityList: ABILITIES.Ability[];
  bomData: UNIT.BomData;
  tribe: DATA.Tribe;
  picturebook: DATA.Picturebook;
};

export type UnitSpineResource = UNIT.SpineResource;

type ChapterInfo = {
  id: number;
  name: string;
  text: string;
  chapter: number | [number, number];
  open_time?: string;
  close_time?: string;
  src?: string;
  shop_id?: number;
  shop_id1?: number;
  event_dataTable_id?: number;
};

export type QuestData = {
  chapterInfo: ChapterInfo,
  levelList: QUEST.Level[];
  missionList: QUEST.Mission[];
  rewardsList: {
    type: EQuest.RewardsCategory;
    info: QUEST.SealedChara;
    list: QUEST.Shop[] & QUEST.EventStarRatingReward[] & QUEST.EventKillReward[] & QUEST.BonusPassReward[] & QUEST.SealedCharaModsReward[];
  }[];
};

export type levelDetailedDataParams = {
  id: number;
  battleMemberId?: number;
  battleNPCId?: number;
  attachTableId?: string;
};

export type levelDetailedData = {
  mapData: LevelMap.Map;
  enemyBuffMenu: QUEST.EnemyBuffMenu;
  battleMemberList?: QUEST.BattleMember[];
  battleNPCList?: QUEST.BattleNpc[];
  attachIdList?: number[];
  mapGroundSources: string[];
  battleEventList: ObjIndex<QUEST.BattleEvent>;
  eventHelpInfoList: ObjIndex<UNIT.Help>;
};

export type QuestCategory = {
  eventList: ObjIndex<QUEST.EventList>,
  main: ObjIndex<QUEST.Main>;
  boss: ObjIndex<QUEST.Boss>;
  other: QUEST.QuestOther[];
  dungeon: ObjIndex<QUEST.Dungeon>;
};