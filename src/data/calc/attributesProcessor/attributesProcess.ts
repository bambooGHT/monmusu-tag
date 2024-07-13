import GetTalentCalculateCategory from "../GetTalentCalculateCategory";
import { addAttrValue, talentAttrCalculateFuncs } from "../calculateFunction";

// [5, RangeType.EnemyAll]
const applicableRangeList = [[23, EAbilities.RangeType.Owner]];

type AttributeCalculator = {
  attributeName: ABILITIES.AttributeNames;
  calculateFns(talentValue: number): number;
};

type AttributeCalculationFunction = {
  calcFn: AttributeCalculator[],
  awakeningCalcFn: AttributeCalculator[];
};

class AttributesProcess {
  static calcBaseAttributes(attr: ABILITIES.Attributes, attributeCalculator: AttributeCalculator[]) {
    const result = {} as ABILITIES.Attributes;
    for (const { attributeName, calculateFns } of attributeCalculator) {
      result[attributeName] ??= 0;
      result[attributeName] += calculateFns(attr[attributeName] as number);
    }
    return result;
  }
  /** 属性相加 */
  static addUpAttributes<T extends ABILITIES.Attributes>(attr1: T, attr2: T): T {
    const result = { ...attr1 };
    for (const attributeName of Object.keys(attr2) as ABILITIES.AttributeNames[]) {
      const value = attr2[attributeName] as number;
      const newValue = addAttrValue(result[attributeName] as number, value);
      result[attributeName] = newValue;
    }
    return result;
  }

  static addUpAttributes2<T extends ABILITIES.Attributes>(oldData: T, newData: T): T {
    const result = { ...oldData };
    for (const item of Object.keys(newData) as ABILITIES.AttributeNames[]) {
      result[item] ??= 0;
      result[item] += newData[item] as number;
    }
    return result;
  }

  static getAttributeCalculationFunction<T extends { talentList: ABILITIES.TalentList; }>(abilityList: T[]) {
    const [awakened, StatusMaxTalent] = [26, 85];
    const result = abilityList.map((p) => p.talentList).reduce((data: AttributeCalculationFunction, talent) => {
      talent.forEach((value) => {
        if (value.talentId > StatusMaxTalent) return data;
        //是否为立刻生效
        const isApplicableRange = applicableRangeList.some(([timing, range]) => value.timing === timing && value.range === range);
        if (isApplicableRange) {
          const { id, attributeName, count } = GetTalentCalculateCategory.getIdAndTalentAttributeName(value.talentId);
          if (attributeName) {
            const calculateFns = talentAttrCalculateFuncs[count][id](value.param[0]);
            const isAwakening = value.triggerData.find(p => p.type === awakened);
            const calcKey: keyof AttributeCalculationFunction = isAwakening ? "awakeningCalcFn" : "calcFn";
            data[calcKey].push({ attributeName, calculateFns });
          }
        }
        return data;
      });

      return data;
    }, { calcFn: [], awakeningCalcFn: [] });

    return result;
  }
}

export default AttributesProcess;