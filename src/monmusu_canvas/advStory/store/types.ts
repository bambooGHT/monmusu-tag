export type StoryEvent = {
  id: number;
  /** 類別 */
  story_category: number;
  /** 故事Id */
  story_id: string;
  /** 故事標題 */
  title: string;
  /** 章節名稱(類型) */
  chapter_name: string;
  /** 場景名稱 */
  scenario_name: string;
  /** 下一個故事id */
  next_id: number;
  /** r18 */
  r18: 0 | 1;
  /** 是否一直可用 */
  always: 0 | 1;
};
/** 主故事 */
export interface StoryMain extends StoryEvent {
  /** 播放時機 */
  play_timing: number;
};

export interface StoryOther extends StoryEvent {
  /** 角色id */
  unit_card_id: number;
  /** 解鎖條件類型 */
  unlock_condition_type: number;
  /** 解鎖條件值 */
  unlock_condition_value: string;
};

export interface StoryUnit extends StoryEvent {
  /** 解锁条件类别 */
  requireItemCategory: number;
  /** 解锁条件item */
  requireItemName: number;
  /** 必须等级 */
  unlockLevel: string;
};