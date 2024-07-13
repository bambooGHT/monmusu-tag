import { getIcon } from "@/data";
import { Url, useSWRAsync } from "@/service";
import { AttributeName } from "@/data/calc/enums";
import GetTalentCalculateCategory from "@/data/calc/GetTalentCalculateCategory";
import type { LevelTimelineEvent } from "../types";

type LevelEventProcess = (event: QUEST.BattleEvent, eventHelpInfoList?: ObjIndex<UNIT.Help>) => Promise<Omit<LevelTimelineEvent, "title" | "time">>;

const getUnits = async (talentList: QUEST.BattleEvent["talentList"], type: Exclude<UNIT.UnitType, "enemy">) => {
  const unitList = await useSWRAsync("unitList", true, type);
  const units = talentList.map((p => {
    return unitList[p.param[0]];
  }));
  return units;
};

export const LevelEventusuallyProcess: LevelEventProcess = async (event) => {
  const talent = event.talentList[0];
  return {
    text: [`value: ${talent.param[0]}`],
  };
};
/** 关卡时间线事件类型 */
export const LevelEvent: Record<string, LevelEventProcess> = {
  "state": async (event) => {
    const chrarcters = await useSWRAsync("unitList", true, "character");
    const talent = event.talentList[0];
    const units = talent.activeData.flatMap(p => p.value.map(v => chrarcters[v]));
    const values = [{
      name: "",
      value: talent.param[0],
      rang: EAbilities.RangeType[talent.range],
      triggerTiming: EAbilities.TriggerTiming[talent.timing]
    }];
    return {
      units,
      values
    };
  },
  "enemyHelp": async (event, eventHelpInfoList) => {
    const eventHelpInfo = eventHelpInfoList![event.talentList[0].param[0]];
    const text = eventHelpInfo.body.map((p) => {
      if (p.includes("png")) p = Url(p);
      return p;
    });
    return {
      text
    };
  },
  // "summonPoint": async (event, time) => {

  // },
  "weather": async (event) => {
    const weatherEffectData = await useSWRAsync("weatherEffect");
    const icon = Url(getIcon.weather(event.talentList[0].param[0]));
    const weatherEffect = weatherEffectData[event.talentList[0].param[1]];
    const values = weatherEffect.talentList.map(p => {
      const talentData = GetTalentCalculateCategory.getIdAndTalentAttributeName(p.talentId);
      const attrName = AttributeName[talentData.attributeName!];

      return {
        name: attrName,
        value: p.param[0],
        rang: EAbilities.RangeType[p.range],
        triggerTiming: EAbilities.TriggerTiming[p.timing]
      };
    });

    return {
      icon,
      text: [weatherEffect.text],
      values
    };
  },
  "beastGodSkill": async (event) => {
    const talent = event.talentList[0];
    return {
      text: [event.text],
      values: [{
        value: talent.param[0],
        rang: EAbilities.RangeType[talent.range],
        triggerTiming: EAbilities.TriggerTiming[talent.timing]
      }]
    };
  },
  "addChrarcter": async (event) => {
    const units = await getUnits(event.talentList, "character");
    return {
      units
    };
  },
  "addBeastGod": async (event) => {
    const units = await getUnits(event.talentList, "beastGod");
    return {
      units
    };
  },
  "story": async (event) => {
    const talent = event.talentList[0];
    return {
      story: {
        id: talent.param[0],
        name: event.text
      },
    };
  },
  "summonPointEffect": async (event) => {
    const text = event.talentList.map((p) => {
      return `summon point ${p.param[0]}`;
    });
    return {
      text
    };
  }
};