import { AttributeKeys, awakeningState } from "./enums";

type Textfeature = Unfold<[keyof typeof AttributeKeys, ABILITIES.TalentIndex]>;

interface BasicAttrCalculate {
  (value: ABILITIES.TalentIndex, talentList: ABILITIES.TalentList): number;
  //需要等级计算
  (value: ABILITIES.TalentIndex, talentList: ABILITIES.TalentList, coefficient?: number): number;
}

const lastAddValue = (value: number) => {
  return value && 1;
};

export const basicAttrCalculate: BasicAttrCalculate = ([lastValue, pointer, index]: ABILITIES.TalentIndex, talentList: ABILITIES.TalentList, coefficient?: number) => {
  const talenIndex = talentList[pointer];
  const paramIndex = talenIndex.param[index];

  if (coefficient !== undefined) {
    let value = ((1 - coefficient) * paramIndex + coefficient * (talenIndex.maxParam[index] || paramIndex)) / (lastValue || 1) + lastAddValue(lastValue);
    const value1 = String(value).split(".");

    if (value1[1]?.length > 5) {
      value = Math.floor(Math.fround(value));
    } else if (value1[1]?.length) {
      value = +`${value1[0]}.${value1[1].slice(0, 2)}`;
    }

    return value;
  }
  return paramIndex / (lastValue || 1) + lastAddValue(lastValue);
};

export const needContainAttrCalculate = (textList: Textfeature, talentList: ABILITIES.TalentList, attributes: ABILITIES.Attributes) => {
  const [attribute, talentIndex] = textList;
  return ~~((basicAttrCalculate(talentIndex, talentList) - 1) * attributes[AttributeKeys[attribute]]);
};

export const timeCalculate = (coefficient: number, mintime: number, maxTime: number, FPS: number): number => {
  return Math.floor(Math.fround(((1 - coefficient) * mintime + coefficient * maxTime) / FPS));
};

export const awakeningCalculate = ([awakening, value]: [keyof typeof awakeningState, string], isAwakened: boolean): string => {
  return isAwakened === !!awakeningState[awakening] ? value : '';
};

export const customRound = (num: number): number => {
  return String(num).endsWith(".5") ? (num -= 0.5) & 1 ? num + 1 : num : Math.round(num);
};


export const addAttrValue = (value1: number, value2: number): number => {
  const newValue = value1 + (value2 > 0 ? ~~value2 : value2);
  return ~~newValue;
};

export const talentAttrCalculateFuncs = (() => {
  const subtractValue = (talentValue: number) => (baseValue: number) => talentValue - baseValue;
  const calcPctOfValue = (talentValue: number) => (pctValue: number) => talentValue * pctValue / 100;
  const calcNegPctOfValue = (talentValue: number) => (negPctValue: number) => -talentValue * negPctValue / 100;
  const positiveValue = (talentValue: number) => () => +talentValue;
  const negativeValue = (talentValue: number) => () => -talentValue;

  const talentCalculateObj = {
    5: [subtractValue, calcPctOfValue, calcNegPctOfValue, positiveValue, negativeValue],
    3: [subtractValue, positiveValue, negativeValue],
    2: [negativeValue, positiveValue],
    1: [positiveValue],
  };
  return talentCalculateObj;
})();