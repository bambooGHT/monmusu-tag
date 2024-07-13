import type { EnemyAbilitiesData } from "../types";
import type { UnitDetailAbilitiesData } from "../../get";
import { reactive } from "vue";
import UnitAbilitiesHandler from "./unitAbilitiesHandler";
import { getResistance } from "@/data/calc/getResistance";

type CreateEnemyReturn = {
  unitAbilitiesData: EnemyAbilitiesData,
  unitAbilitiesHandler: UnitAbilitiesHandler;
};

export const createEnemy = (value: UnitDetailAbilitiesData): CreateEnemyReturn => {
  const resistance = getResistance(value.unit);

  const unitAbilitiesData = reactive<EnemyAbilitiesData>({
    unit: value.unit,
    attributes: {
      HP: 0,
      ATK: 0,
      DEF: 0,
      MDEF: 0,
      Range: 0,
      ASPD: 0,
      Targets: 0,
      ACD: 0,
      SPD: 0,
    },
    abilityList: {
      index: 0,
      name: value.abilityList.names,
      text: []
    },
    help: value.help,
    entranceMap: {
      list: value.enemyEntranceMaps || [],
      current: value.enemyEntranceMaps?.[0] || {} as any
    },
    resistance
  });

  const unitAbilitiesHandler = new UnitAbilitiesHandler({
    FPS: EMap.MapBase.FPS,
    unit: value.unit,
    abilityList: {
      data: value.abilityList.list,
      maxLevel: EUnit.ABILITY_LEVEL.MAX
    }
  }, unitAbilitiesData);

  return { unitAbilitiesData, unitAbilitiesHandler };
};