import type { UnitDetailAbilitiesData } from "../../get";
import type { CharacterAbilitiesData } from "../types";
import UnitAbilitiesHandler from "./unitAbilitiesHandler";
import { reactive } from "vue";

type CreateCharacterReturn = {
  unitAbilitiesData: CharacterAbilitiesData,
  unitAbilitiesHandler: UnitAbilitiesHandler;
};

export const createCharacter = (value: UnitDetailAbilitiesData): CreateCharacterReturn => {
  const unitAbilitiesData = reactive({
    classIndex: 0,
    equipmentIndex: -1,
    uwIndex: 0,
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
    job: value.job,
    awakenings: value.awakenings.value,
    raceFeature: {
      name: value.raceFeature.name,
      text: [],
    },
    jobFeature: {
      name: value.jobFeature.names,
      text: [],
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
    level: {
      currentLevel: EUnit.CLASS_LEVEL.MIN,
      levelExp: 0,
      needExpPropsNum: []
    },
    expList: value.unitLevelExps,
    expInfo: value.EXP
  });

  const unitAbilitiesHandler = new UnitAbilitiesHandler({
    classLevelCoefficient: EUnit.CLASS_COEFFICIENT.CHARACTER,
    FPS: EMap.MapBase.FPS,
    unit: value.unit,
    jobs: value.job,
    equipments: value.equipments,
    raceFeature: value.raceFeature,
    jobFeature: value.jobFeature.list,
    uniqueWeapon: value.uniqueWeapon,
    awakenings: value.awakenings.list,
    skill: {
      data: value.skill.list,
      maxLevel: EUnit.SKILL_LEVEL.MAX,
      interpolationTime: value.skill.skillFirst
    }
  }, unitAbilitiesData, EUnit.CLASS_COEFFICIENT.CHARACTER);

  return { unitAbilitiesData, unitAbilitiesHandler };
};