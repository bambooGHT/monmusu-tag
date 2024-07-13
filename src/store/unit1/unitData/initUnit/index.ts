import { getDetailAbilitiesData } from "../get";
import { createBeastGod } from "./beastGod";
import { createCharacter } from "./character";
import { createToken } from "./token";
import { createEnemy } from "./enemy";

const createUnitData: Record<UNIT.UnitType, any> = {
  character: createCharacter,
  beastGod: createBeastGod,
  enemy: createEnemy,
  token: createToken
};

export const initUnit = async (id: string, unitType: UNIT.UnitType) => {
  const unitDetailData = await getDetailAbilitiesData(id, unitType);
  const { unitAbilitiesData, unitAbilitiesHandler } = createUnitData[unitType](unitDetailData);

  return { unitDetailData, unitAbilitiesData, unitAbilitiesHandler };
};
