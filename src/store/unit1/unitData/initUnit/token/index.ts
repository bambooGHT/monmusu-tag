import type { TokenAbilitiesData } from "../types";
import type { UnitDetailAbilitiesData } from "../../get";
import UnitAbilitiesHandler from "./unitAbilitiesHandler";
import { reactive } from "vue";

type createTokenReturn = {
  unitAbilitiesData: TokenAbilitiesData,
  unitAbilitiesHandler: UnitAbilitiesHandler;
};

export const createToken = (value: UnitDetailAbilitiesData): createTokenReturn => {
  const unitAbilitiesData = reactive({
    unit: value.unit,
    attributes: {
      HP: 0,
      ATK: 0,
      DEF: 0,
      MDEF: 0,
      Block: 0,
      Range: 0,
      ASPD: 0,
      COST: 0,
      Targets: 0,
      ACD: 0,
      SPD: 0,
      MC: 0,
    },
    tokenData: value.tokenData,
    abilityList: {
      index: 0,
      name: value.abilityList.names,
      text: []
    },
    job: value.job,
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
    level: {
      currentLevel: EUnit.CLASS_LEVEL.MIN,
    }
  });

  const unitAbilitiesHandler = new UnitAbilitiesHandler({
    FPS: EMap.MapBase.FPS,
    maxLevel: EUnit.CLASS_COEFFICIENT.TOKEN,
    unit: value.unit,
    jobs: value.job,
    skill: {
      data: value.skill.list,
      maxLevel: EUnit.SKILL_LEVEL.MAX,
      interpolationTime: value.skill.skillFirst,
    },
    abilityList: value.abilityList.list
  }, unitAbilitiesData);

  return { unitAbilitiesData, unitAbilitiesHandler };
};