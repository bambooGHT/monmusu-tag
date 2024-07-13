import type { UnitBaseData } from "../get";
import characterAbilitiesHandler from "./character/unitAbilitiesHandler";
import tokenAbilitiesHandler from "./token/unitAbilitiesHandler";
import beastGodAbilitiesHandler from "./beastGod/unitAbilitiesHandler";
import enemyAbilitiesHandler from "./enemy/unitAbilitiesHandler";
import { Resistance } from "@/data/calc/getResistance";
import { AbilityText } from "@/data/calc/abilitiesTextProcessor/types";

export type CharacterAbilitiesData = {
  classIndex: number;
  equipmentIndex: number;
  uwIndex: number;
  unit: UnitBaseData["unit"];
  attributes: ABILITIES.Attributes;
  job: DATA.Job[];
  awakenings: string[];
  raceFeature: {
    name: string;
    text: AbilityText;
  },
  jobFeature: {
    name: string[];
    text: AbilityText;
  },
  skill: CharacterAbilitiesData["jobFeature"] & {
    index: number;
    level: number;
    time: {
      cool: number;
      first: number;
    };
  };
  level: {
    currentLevel: number,
    levelExp: number,
    needExpPropsNum: number[];
  };
  expList: number[];
  expInfo: DATA.Wallet[];
};

export type TokenAbilitiesData = {
  unit: UnitBaseData["unit"];
  attributes: ABILITIES.Attributes;
  job: DATA.Job[];
  abilityList: CharacterAbilitiesData["jobFeature"] & { index: number; },
  level: {
    currentLevel: number,
  };
  skill: CharacterAbilitiesData["skill"];
  tokenData: UNIT.TokenData;
};

export type BeastGodAbilitiesData = {
  unit: UnitBaseData["unit"];
  abilityList: CharacterAbilitiesData["jobFeature"] & { index: number; level: number; },
  skill: CharacterAbilitiesData["skill"];
  recoverCost: {
    value: number;
    maxValue: number;
  };
};

export type EnemyAbilitiesData = {
  unit: UnitBaseData["unit"];
  attributes: ABILITIES.EnemyAttributes;
  abilityList: CharacterAbilitiesData["jobFeature"] & { index: number; },
  entranceMap: { current: UNIT.EnemyEntranceMaps[0]; list: UNIT.EnemyEntranceMaps; };
  help?: UNIT.Help;
  resistance: Resistance;
};

export type UnitAbilitiesHandler = characterAbilitiesHandler & tokenAbilitiesHandler & beastGodAbilitiesHandler & enemyAbilitiesHandler;
export type UnitAbilitiesData = CharacterAbilitiesData & TokenAbilitiesData & BeastGodAbilitiesData & EnemyAbilitiesData;