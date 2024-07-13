import { basicAttrCalculate, needContainAttrCalculate, timeCalculate, awakeningCalculate } from "../calculateFunction";
import { awakeningState } from "../enums";
import type { TupleCombination } from "./types";

type CalculateTextFunctionClassifyReturn = {
  basic?: Unfold<TupleCombination<typeof basicAttrCalculate>>;
  needAttr?: Unfold<TupleCombination<typeof needContainAttrCalculate>>;
  time?: Unfold<TupleCombination<typeof timeCalculate>>;
  awakening?: Unfold<TupleCombination<typeof awakeningCalculate>>;
};
const valueKey = Object.values(awakeningState).filter(p => isString(p));

type ToCalcutateText<T> = Required<{
  [K in keyof T]?: K extends keyof CalculateTextFunctionClassifyReturn ? CalculateTextFunctionClassifyReturn[K] : never
}>;

const getCalculateTextFunctionClassify = <T extends { [V in keyof CalculateTextFunctionClassifyReturn]?: boolean }, K extends ToCalcutateText<T>>
  (talentList: ABILITIES.Ability[], classify: T): K[] => {
  const result: K[] = [];
  const textTalentList = talentList.map((p) => p.text);
  const calcTextClassifyObj = Object.entries(classify).reduce((data: any, [key, is]) => {
    if (is) data[key] = [];
    return data;
  }, {});

  textTalentList.forEach((item, index) => {
    const calcTextClassify = JSON.parse(JSON.stringify(calcTextClassifyObj));
    const [textList, textIndex] = item;
    result[index] = calcTextClassify;
    for (const i of textIndex) {
      if (textList[i].length === 3) {
        result[index].basic?.push([i, basicAttrCalculate]);
      }
      //如果是2维数组,需要基础能力计算
      else if (Array.isArray(textList[i][1])) {
        result[index].needAttr?.push([i, needContainAttrCalculate]);
      }
      //需要觉醒

      else if (valueKey.includes(textList[i][0])) {
        result[index].awakening?.push([i, awakeningCalculate]);
      }
      else {
        result[index].time?.push([i, timeCalculate]);
      }
    }
  });
  return result;
};

export default getCalculateTextFunctionClassify;