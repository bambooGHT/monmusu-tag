import getCalculateTextFunctionClassify from "./getCalculateTextFunctionClassify";
import { customRound, timeCalculate } from "../calculateFunction";
import type { InterpolationTime, AbilityText } from "./types";
import type { CalcAbilitiesProps } from "../types";

type SkillTextProcessParams = {
  list: UNIT.Skill[];
  maxLevel: number;
  interpolationTime: InterpolationTime | number;
  props: Readonly<CalcAbilitiesProps>;
};

class SkillTextProcess {
  constructor(private readonly skillData: Readonly<SkillTextProcessParams>) { }
  getValue(index: number, level: number): { text: AbilityText, time: InterpolationTime; } {
    const { maxLevel, list, props } = this.skillData;
    const calculateTextFunctionClassify = getCalculateTextFunctionClassify(list, {
      "basic": true,
      "needAttr": true,
      "time": true
    });

    const getValue = (index: number, level: number) => {
      if (!list[index]) return { text: ["null"], time: { cool: 0, first: 0 } };

      const { text, talentList, minDurationTime, maxDurationTime } = list[index];
      const text1 = text[0] as any[];
      const functionClassify = calculateTextFunctionClassify[index];
      const levelCoefficient = level / maxLevel;
      const resultTime = this.#getCoolTime(index, levelCoefficient);
      const resultText: AbilityText = [...text1];
      
      functionClassify.basic.forEach(([i, fn]) => {
        resultText[i] = fn(text1[i], talentList, levelCoefficient);
      });

      if (props.attributes) {
        functionClassify.needAttr.forEach(([i, fn]) => {
          resultText[i] = fn(text1[i], talentList, props.attributes);
        });
      }
      functionClassify.time.forEach(([i, fn]) => {
        resultText[i] = fn(levelCoefficient, minDurationTime, maxDurationTime, props.FPS);
      });
      
      return { text: resultText, time: resultTime };
    };

    this.getValue = getValue;
    return getValue(index, level);
  }

  #getCoolTime(index: number, levelCoefficient: number) {
    const { list, interpolationTime, props: { FPS } } = this.skillData;
    const result = { cool: 0, first: 0 };

    if (list[index]) {
      if (isNumber(interpolationTime)) {
        const { minCoolTime, maxCoolTime } = list[index];
        result.cool = timeCalculate(levelCoefficient, minCoolTime, maxCoolTime, FPS);
        result.first = customRound(result.cool * interpolationTime / 100);
      } else {
        const { cool, first } = interpolationTime;
        result.cool = customRound(timeCalculate(levelCoefficient, cool, cool, FPS));
        result.first = customRound(timeCalculate(levelCoefficient, first, first, FPS));
      }
    }

    return result;
  }
}
export default SkillTextProcess;