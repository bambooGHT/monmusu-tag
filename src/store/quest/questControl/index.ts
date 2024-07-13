import type { QuestData } from "@/service/types";
import type {
  Quest, LevelData, MissionData, LevelDetailedData,
  EnemyDeployCount, EnemyDeployValue, LevelTimelineEnemyDeploy, Timeline,
  BattleUnit,
} from "../types";
import ClassAttributes2 from "@/data/calc/attributesProcessor/classAttributes2";
import { Url, useSWRAsync } from "@/service";
import { getIcon, getItemValue } from "@/data";
import { levelMap, questData } from "..";
import { rewardsType } from "./processRewardsData";
import { getResistance } from "@/data/calc/getResistance";
import { useSWR } from "@/service";
import { LevelEvent, LevelEventusuallyProcess } from "./LevelEvent";
import { message } from "@/message";

const picturebooks = useSWR("picturebooks", false);

class QuestControl {
  private questCache = new Map<number, Quest>();
  private LevelDetailedDataCache = new Map<number, LevelDetailedData>();

  async updateQuest(id: number) {
    const { questCache } = this;
    const _quest = questCache.get(id);

    if (_quest) {
      Object.assign(questData, _quest);
      return;
    }

    const quest = await useSWRAsync("questData", false, id);
    const levelList = await this.#processLevelData(quest.levelList);
    const missionList = await this.#processMissionData(quest.missionList);
    const rewardsList = await this.#processRewardsData(quest.rewardsList);

    const result = { id, chapterInfo: quest.chapterInfo, levelList, missionList, rewardsList };

    Object.assign(questData, result);
    questCache.set(id, result);
  };

  async updateCurrentLevel(levelId?: number) {
    levelMap.destroy();
    questControl.updateCurrentEnemy();

    if (!levelId) {
      questData.currentLevel = undefined;
      return;
    }

    const { LevelDetailedDataCache } = this;
    const levelData = questData.levelList.find(p => p.id === levelId);

    if (!levelData) {
      message.add({ type: "error", message: `The chapter with the ID "${levelId}" does not exist` });
      questData.currentLevel = undefined;
      return;
    }

    const { mapDataIndex: mapId } = levelData;
    const _levelDetailedData = LevelDetailedDataCache.get(mapId);
    if (_levelDetailedData) {
      Object.assign(questData, { currentLevel: { detailedData: _levelDetailedData, data: levelData } });
      this.updateMap();
      return;
    }

    const { battleNPCId, battleMemberId, subSkillPrizeTableId, limitMemberId } = levelData;
    const levelDetailed = await useSWRAsync("levelDetailedData", false, {
      id: mapId,
      battleNPCId,
      battleMemberId,
      attachTableId: subSkillPrizeTableId
    });
    const { battleMemberList, battleNPCList, mapData, battleEventList, eventHelpInfoList, attachIdList } = levelDetailed;
    const result = { ...levelDetailed } as LevelDetailedData;

    result.enemyDeployCount = await this.#ProcessEnemyDeployCount(mapData.deployEntries);
    result.timelineList = await this.#processLevelTimeline(mapData.deployEntries, battleEventList, eventHelpInfoList);
    if (battleMemberList) {
      result.battleMemberList = await this.#getBattleUnit(battleMemberList);
    }
    if (battleNPCList) {
      result.battleNPCList = await this.#getBattleUnit(battleNPCList);
    }
    if (attachIdList) {
      result.attachList = (await this.#getAttachList(attachIdList)).reverse();
    }
    if (limitMemberId) {
      const characters = await useSWRAsync("unitList", true, "character");
      result.needUnitopen = characters[limitMemberId];
    }

    questData.currentLevel = {
      data: levelData,
      detailedData: result,
    };

    LevelDetailedDataCache.set(mapId, result);
    this.updateMap();
  }

  updateCurrentEnemy(enemyValue?: EnemyDeployValue) {
    if (!enemyValue) {
      questData.currentEnemy = undefined;
      return;
    }
    const { unit } = enemyValue;
    const { data: level } = questData.currentLevel!;
    const classAttributes = new ClassAttributes2(unit);

    const raw = classAttributes.getAttributes(100);
    const revision = level.enemyRevision === 100 ? undefined : classAttributes.getAttributes(level.enemyRevision);
    const picturebook = picturebooks.value[unit.picture];
    const resistance = getResistance(unit);

    questData.currentEnemy = {
      ...enemyValue,
      attributes: { raw, revision },
      picturebook,
      resistance
    };
  }

  async updateMap() {
    const levelDetailed = questData.currentLevel?.detailedData;
    if (!levelDetailed) return;
    const { mapData } = levelDetailed;
    const initMapData = {
      routes: mapData.routes,
      summonPoints: mapData.summonPoints,
      mapGroundSources: levelDetailed.mapGroundSources,
      sizeRatio: mapData.sizeRatio,
      unitScaleRatio: mapData.unitScaleRatio,
      corePos: mapData.corePos,
      npcList: levelDetailed.battleNPCList?.map((p) => ({
        resource: p.unit.resource,
        summonPoint: p.summonPointId,
        lookAtLeft: p.lookAtLeft
      }))
    };
    await levelMap.loadMap(initMapData);
  }
  async #processLevelData(levelList: QUEST.Level[]): Promise<LevelData[]> {
    const data = await Promise.all(levelList.map(async (value) => {
      const beginningRewardtable = await getItemValue(value.beginningRewardtable);
      const highLevelRewardtable = await getItemValue(value.highLevelRewardtable);
      const cleartable = await getItemValue(value.cleartable);
      const delegatetable = await getItemValue(value.delegatetable);
      const levelStory = {
        "before level start": value?.before_story_chapter_id,
        "before battle": value?.bfr_btl_story_chapter_id,
        "after battle": value?.afr_btl_story_chapter_id,
        "after level end": value?.after_story_chapter_id,
      };
      const result: LevelData = { ...value, beginningRewardtable, highLevelRewardtable, cleartable, delegatetable, levelStory };

      if (value.consumption_name) {
        result.iconUrl = Url(getIcon.wallet(value.consumption_name));
      }
      return result;
    }));

    data.sort((a, b) => a.id - b.id);
    return data;
  }

  #processMissionData(mission: QUEST.Mission[]): Promise<MissionData[]> {
    return Promise.all(mission.map(async (value) => {
      const { rewardtable, ...v } = value;
      const rewards = await getItemValue(rewardtable);
      return { ...v, rewardtable: rewards };
    }));
  }

  #processRewardsData(RewardsList: QuestData["rewardsList"]): Promise<Quest["rewardsList"]> {
    return RewardsList.reduce(async (result: any, { list, info, ...data }) => {
      result = await result;
      result[data.type] = Object.assign(data, { ...await rewardsType[data.type](list, info) });
      return result;
    }, {});
  };

  async #ProcessEnemyDeployCount(deployEntries: LevelMap.DeployEntrie[]): Promise<EnemyDeployCount> {
    const enemys = await useSWRAsync("unitList", true, "enemy");
    const deploys = deployEntries.flatMap(p => {
      return Array.from({ length: p.callCount }, () => p.deploys).flat(1);
    });
    const enemyDeploysCountData = deploys.reduce((data: any, value) => {
      const route = data.enemyDeployRoutesCount[value.routeId] ??= {};
      if (enemys[value.appId]) {
        const currentEnemy1 = route[value.appId] ??= {
          unit: enemys[value.appId],
          count: 0
        };
        const currentEnemy2 = data.enemyDeployCount[value.appId] ??= {
          unit: enemys[value.appId],
          count: 0
        };

        currentEnemy1.count += 1;
        currentEnemy2.count += 1;
        data.total += 1;
      }

      return data;
    }, { enemyDeployRoutesCount: {}, enemyDeployCount: {}, total: 0 });

    for (const [routeId, routeList] of Object.entries(enemyDeploysCountData.enemyDeployRoutesCount)) {
      enemyDeploysCountData.enemyDeployRoutesCount[routeId] = Object.values(routeList as any);
    }
    enemyDeploysCountData.enemyDeployCount = Object.values(enemyDeploysCountData.enemyDeployCount);

    return enemyDeploysCountData;
  }

  async #getBattleUnit<T extends Omit<QUEST.BattleMember, "IsToken">>(
    battleList: (T & { id?: number; IsToken?: number; })[]): Promise<(T & BattleUnit)[]> {

    const characters = await useSWRAsync("unitList", true, "character");
    const tokens = await useSWRAsync("unitList", true, "token");

    if ("IsToken" in battleList[0]) {
      const tokenDataList = await useSWRAsync("tokenData", true);
      battleList.forEach((p) => {
        if (p.IsToken) {
          const tokenData = tokenDataList[p.cardId]!;
          p.cardId = tokenData.summonIndex;
          p.id = tokenData.id;
        }
      });
    }

    return battleList.map((p) => {
      return { ...p, unit: characters[p.cardId] || tokens[p.cardId] };
    });
  }

  async #getAttachList(idList: number[]) {
    const attachData = await useSWRAsync("attach");
    const ids = new Set(idList);
    return attachData.reduce((result: Required<LevelDetailedData>["attachList"], value) => {
      if (ids.has(value.id)) {
        result.push({
          id: value.id,
          name: value.name,
          text: value.text,
        });
      }
      return result;
    }, []);
  }

  async #processLevelTimeline(deployEntries: LevelMap.DeployEntrie[], battleEvents: ObjIndex<QUEST.BattleEvent>, eventHelpInfoList: ObjIndex<UNIT.Help>) {
    const result: Timeline[] = [];
    const enemys = await useSWRAsync("unitList", true, "enemy");

    for (const item of deployEntries) {
      const events = await Promise.all(item.events.map(async (p) => {
        const battleEvent = battleEvents[p.eventId];
        const talentId = battleEvent.talentList[0].talentId;
        const event = await (LevelEvent[EData.BattleTalentId[talentId]] || LevelEventusuallyProcess)(battleEvent, eventHelpInfoList);
        return Object.assign({ title: battleEvent.name, time: p.timing }, event);
      }));
      let enemyTotal = 0;
      const deploys = item.deploys.reduce((data: ObjIndex<LevelTimelineEnemyDeploy>, v) => {
        const currentTiming = data[v.timing] ??= { time: v.timing, list: [] };
        if (enemys[v.appId]) {
          enemyTotal += 1;
          const enemy = currentTiming.list.find(p => p.value.appId === v.appId);
          if (enemy) enemy.count += 1;
          else {
            currentTiming.list.push({
              enemy: enemys[v.appId],
              value: v,
              count: 1
            });
          }
        }

        return data;
      }, {});

      result.push({
        id: item.id,
        startTime: events[0]?.time || item.deploys[0]?.timing || 0,
        callCount: item.callCount,
        autoBoot: item.auto === 1,
        nextEntryId: item.nextEntryId,
        enemyTotal,
        events,
        deploys: Object.values(deploys)
      });
    }
    return result;
  }
}

export const questControl = new QuestControl();