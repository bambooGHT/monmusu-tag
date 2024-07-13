import type { BeastGodAbilitiesData } from "../types";
import type { UnitDetailAbilitiesData } from "../../get";
import { reactive } from "vue";
import UnitAbilitiesHandler from "./unitAbilitiesHandler";

type CreateBeastGodReturn = {
  unitAbilitiesData: BeastGodAbilitiesData,
  unitAbilitiesHandler: UnitAbilitiesHandler;
};

export const createBeastGod = (value: UnitDetailAbilitiesData): CreateBeastGodReturn => {
  const unitAbilitiesData = reactive<BeastGodAbilitiesData>({
    unit: value.unit,
    abilityList: {
      index: 0,
      level: 0,
      name: value.abilityList.names,
      text: []
    },
    skill: {
      index: 0,
      level: 0,
      name: value.skill.names,
      text: [],
      time: {
        cool: 0,
        first: 0
      }
    },
    recoverCost: {
      value: value.bomData.recoverCost,
      maxValue: value.bomData.recoverCost * value.bomData.recoverCostMaxMagni / 100
    }
  });

  const unitAbilitiesHandler = new UnitAbilitiesHandler({
    FPS: EMap.MapBase.FPS,
    skill: {
      data: value.skill.list,
      maxLevel: EUnit.BEASTGOD_SKILL_LEVEL.MAX,
      interpolationTime: {
        cool: value.bomData.interval,
        first: value.bomData.standby
      },
    },
    abilityList: {
      data: value.abilityList.list,
      maxLevel: EUnit.ABILITY_LEVEL.MAX
    }
  }, unitAbilitiesData);

  return { unitAbilitiesData, unitAbilitiesHandler };
};