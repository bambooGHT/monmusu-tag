import getCalculateTextFunctionClassify from "./getCalculateTextFunctionClassify";
import type { CalcAbilitiesProps } from "../types";
import type { AbilityText } from "./types";

type AbilityTextProcessParams = {
  list: ABILITIES.Ability[];
  maxLevel?: number;
  props?: Readonly<CalcAbilitiesProps>;
};

class AbilityTextProcess {
  constructor(private readonly abilityData: Readonly<AbilityTextProcessParams>) { }

  getValue(): AbilityText;
  getValue(Index?: number): AbilityText;
  getValue(Index?: number, Level?: number): AbilityText;
  getValue(Index: number = 0, Level?: number) {
    const { list, maxLevel, props } = this.abilityData;
    const calculateTextFunctionClassify = getCalculateTextFunctionClassify(list, {
      "basic": true,
      "needAttr": true,
      "awakening": true
    });

    const getValue = (index: number = 0, level?: number) => {
      if (!list[index]) return ["null"];

      const { text, talentList } = list[index];
      const textValue = text[0] as any[];
      const CalcutateIndex = calculateTextFunctionClassify[index];
      const coefficient = maxLevel ? (level! / maxLevel) : undefined;
      const result: AbilityText = [...textValue];

      CalcutateIndex.basic.forEach(([i, fn]) => {
        result[i] = Math.floor(fn(textValue[i], talentList, coefficient));
      });

      if (props) {
        CalcutateIndex.awakening.forEach(([i, fn]) => {
          result[i] = fn(textValue[i], props.awakening || false);
        });
        props.attributes && CalcutateIndex.needAttr.forEach(([i, fn]) => {
          result[i] = fn(textValue[i], talentList, props.attributes);
        });
      }
      return result;
    };

    this.getValue = getValue;
    return getValue(Index, Level);
  }
}

export default AbilityTextProcess;