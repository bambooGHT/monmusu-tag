import { unitAbilitiesHandler, unitAbilitiesData } from "@/store/unit1/unitData";

type EqKeylist = {
  key: keyof DATA.Equipment,
  name: string;
};

export const classPhase = Object.values(EUnit.CLASS_PHASE).filter(p => isNumber(p)) as number[];

export const updateClassAndLevel = (index: number, lv: number) => {
  const { classIndex, level: { currentLevel } } = unitAbilitiesData;

  index = (classIndex === index && lv === currentLevel) ? index - 1 : index;
  unitAbilitiesHandler.updateClass(Math.min(index, classPhase.length - 1));
  unitAbilitiesHandler.updateLevel(lv);
};

export const eqAttrFilter = (eq: DATA.Equipment) => {
  return eqKeylist.reduce((eqArr: [string, number][], { key, name }) => {
    eq[key] !== 0 && eqArr.push([name, eq[key] as number]);
    return eqArr;
  }, []);
};

const eqKeylist: EqKeylist[] = [
  {
    key: "min_life",
    name: "HP"
  },
  {
    key: "min_power",
    name: "ATK"
  },
  {
    key: "min_defense",
    name: "DEF"
  },
  {
    key: "min_magic_resist",
    name: "MDEF"
  },
  {
    key: "min_range",
    name: "Range"
  },
  {
    key: "min_attack_speed",
    name: "ASPD"
  },
  {
    key: "min_attack_interval",
    name: "ACD"
  }
];