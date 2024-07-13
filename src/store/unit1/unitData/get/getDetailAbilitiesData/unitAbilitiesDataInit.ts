import type { UnitOriginalAbilitiesData } from "@/service/types";
import { unitRarity } from "@/store/unit1/unitData/basicData";
import AbilitiesDataProcess from "./unitDataProcess";
import { useSWRAsync } from "@/service";

const character = async (unit: UNIT.Character, data: UnitOriginalAbilitiesData, tokenData?: UNIT.TokenData) => {
  const { value: job, jobFeature } = await AbilitiesDataProcess.JobData(unit.classId);
  const awakenings = await AbilitiesDataProcess.awakeningsData(unit);
  const equipments = await AbilitiesDataProcess.equipmentData(job[0].equipmentPattern);
  const wallet = await useSWRAsync("walletData");
  const unitLevelExps = await useSWRAsync("unitLevelExps");
  const skills = AbilitiesDataProcess.AbilityList(unit.id, data.skill);
  const raceFeature = data.raceFeature;
  const uniqueWeapon = data.uniqueWeapon;
  const { unit_exp_r_all, unit_exp_sr_all, unit_exp_ssr_all } = wallet;

  return {
    awakenings,
    raceFeature,
    skill: {
      list: skills.list,
      names: skills.names,
      skillFirst: unitRarity[unit.rarityId].skillFirstRate
    },
    job,
    jobFeature,
    equipments,
    uniqueWeapon,
    unitLevelExps: unitLevelExps[unit.rarityId],
    EXP: [unit_exp_r_all, unit_exp_sr_all, unit_exp_ssr_all],
    tokenData,
  };
};

const beastGod = async (unit: UNIT.BeastGod, data: UnitOriginalAbilitiesData) => {
  const { id } = unit;
  const abilityList = AbilitiesDataProcess.AbilityList(id, data.abilityList);
  const skill = AbilitiesDataProcess.AbilityList(id, data.skill);

  return {
    abilityList,
    skill,
    bomData: data.bomData
  };
};

const enemy = async (unit: UNIT.Enemy, data: UnitOriginalAbilitiesData) => {
  const abilityList = AbilitiesDataProcess.AbilityList(unit.id, data.abilityList);
  return {
    enemyEntranceMaps: data.enemyEntranceMaps,
    help: data.help,
    abilityList,
    associationIds: data.associationIds
  };
};

const token = async (unit: UNIT.Character, data: UnitOriginalAbilitiesData, tokenData: UNIT.TokenData) => {
  const { id } = unit;
  const abilityList = AbilitiesDataProcess.AbilityList(id, data.abilityList);
  const skills = AbilitiesDataProcess.AbilityList(id, data.skill);

  const { job } = await useSWRAsync("jobData");

  return {
    tokenData,
    job: [job[unit.classId]],
    abilityList,
    skill: {
      list: skills.list,
      names: skills.names,
      skillFirst: unitRarity[unit.rarityId].skillFirstRate,
    },
  };
};

export const unitAbilitiesDataInit = {
  character,
  beastGod,
  enemy,
  token
};