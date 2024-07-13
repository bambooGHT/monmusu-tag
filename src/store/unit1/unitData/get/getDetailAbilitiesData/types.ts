import { unitAbilitiesDataInit } from "./unitAbilitiesDataInit";

export type UnitBaseData = {
  unit: UNIT.Character & UNIT.BeastGod & UNIT.Enemy;
  unitType: UNIT.UnitType;
  tribe: DATA.Tribe;
  picturebook: DATA.Picturebook;
  skin: DATA.Skin[];
  id: number | string;
};

type ReturnPromise<T> = T extends Promise<infer R> ? R : never;

type UnitDetailAbilitiesDataReturnValue = {
  [K in keyof typeof unitAbilitiesDataInit]: ReturnPromise<ReturnType<typeof unitAbilitiesDataInit[K]>>
}[keyof typeof unitAbilitiesDataInit];

type UnionToIntersection<T> = (T extends T ? (value: T) => any : never) extends
  (args: infer U) => any ? U : never;

export type UnitDetailAbilitiesData = UnitBaseData & UnionToIntersection<UnitDetailAbilitiesDataReturnValue>;

export type UnitDetailAbilitiesDataValue<T extends UNIT.UnitType> = ReturnPromise<ReturnType<typeof unitAbilitiesDataInit[T]>>;