import { ResistanceKey } from "./enums";

export type Resistance = { name: string, value: number | string; }[];

export const getResistance = (enemy: UNIT.Enemy) => {
  const enemyEntries = <[keyof typeof ResistanceKey, any][]>Object.entries(enemy);
  return enemyEntries.reduce((result: Resistance, [key, v]) => {
    if (ResistanceKey[key]) {
      result.push({ name: ResistanceKey[key], value: v });
    }
    return result;
  }, []);
};