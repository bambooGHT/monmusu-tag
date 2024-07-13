import type { UnitOriginalAbilitiesDataParams } from "@/service/types";
import type { UnitDetailAbilitiesData } from "./types";
import { useSWRAsync } from "@/service";
import { err } from "./err";
import { unitAbilitiesDataInit } from "./unitAbilitiesDataInit";

export type * from "./types";

const unitAbilitiesData: ObjIndex<UnitDetailAbilitiesData> = {};

export const getDetailAbilitiesData = async <T extends UNIT.UnitType>(id: string, unitType: T): Promise<Unfold<UnitDetailAbilitiesData>> => {
  if (unitAbilitiesData[id]) return unitAbilitiesData[id];

  const unitData = await useSWRAsync("unitList", true, unitType);
  let unit = unitData[id];
  let tokenData;
  let numId = +id;

  if (unitType === "character") {
    const tokenDatas = Object.values(await useSWRAsync("tokenData"));
    tokenData = tokenDatas.find(p => p.summonIndex === numId);
  } else if (unitType === "token") {
    const tokenDataId = +(<string>id).split("token")[1];
    const tokenDatas = await useSWRAsync("tokenData");

    tokenData = tokenDatas[tokenDataId] || {
      id: 0,
      name: '',
      summonIndex: tokenDataId,
      cost: 0,
      time: 0,
      stock: 0,
      standby: 0,
      interval: 0,
      isAttack: 0,
      summonType: 0
    };
    numId = tokenData.summonIndex;
    unit = unitData[tokenData.summonIndex];
  }

  if (!unit) {
    console.log("id: ", id, "\ntype: ", unitType);
    throw err(id);
  }

  const reqParams: UnitOriginalAbilitiesDataParams = {
    id: numId,
    unitType,
    tribeId: unit.mainTribe,
    picture: unit.picture,
    abilityIdList: unit.ability
  };

  if ("skillId1" in unit) reqParams.skillIds = [unit.skillId1, unit.skillId2, unit.skillId3];

  if ("helpWindowId" in unit) reqParams.helpId = unit.helpWindowId;

  const data = await useSWRAsync("unitAbilities", false, reqParams);
  const baseData = {
    unit,
    unitType,
    tribe: data.tribe,
    picturebook: data.picturebook,
    skin: data.skin,
    id
  };
  const result = await unitAbilitiesDataInit[unitType](unit as any, data, tokenData!);

  return unitAbilitiesData[id] = Object.assign(baseData, result) as any;
};