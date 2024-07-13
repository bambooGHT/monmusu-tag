type ClassAttributesParams = {
  unit: UNIT.Character,
  jobs: DATA.Job[],
};

type ClassAttributesParams2 = { classLevelCoefficient: number; maxLevel?: number; } | { maxLevel: number; classLevelCoefficient?: number; };

class ClassAttributes {
  constructor(private data: ClassAttributesParams & ClassAttributesParams2) { }

  getAttributes(Level: number, Index: number = 0) {
    const { data } = this;
    const { unit, jobs } = data;
    const { life, power, defense, magicDefense, cost } = unit;

    const getAttributes = (level: number, index: number = 0) => {
      const maxlevel = data.maxLevel ?? (index + 1) * data.classLevelCoefficient!;
      const calculateAttributes = this.#calculateAttributes(level, maxlevel);
      const { minLife, maxLife, minPower, maxPower,
        minDefense, maxDefense, minMagicDefense, maxMagicDefense,
        attackRange, cost: jobCost, attackSpeed, attackInterval,
        blockNum, targetNum, moveSpeed, moveCost
      } = jobs[index];

      const Attributes: ABILITIES.Attributes = {
        HP: calculateAttributes(life, [minLife, maxLife]),
        ATK: calculateAttributes(power, [minPower, maxPower]),
        DEF: calculateAttributes(defense, [minDefense, maxDefense]),
        MDEF: calculateAttributes(magicDefense, [minMagicDefense, maxMagicDefense]),
        Block: blockNum,
        Range: attackRange,
        ASPD: 100 + attackSpeed,
        COST: jobCost + cost,
        Targets: targetNum,
        ACD: attackInterval,
        SPD: moveSpeed,
        MC: moveCost,
        CRIT_RATE: 0,
        CRIT_DAMAGE: 50
      };
      return Attributes;
    };
    this.getAttributes = getAttributes;
    return getAttributes(Level, Index);
  }
  //计算基础属性值
  #calculateAttributes(level: number, MAXLEVEL: number) {
    return (value: number, minAndMaxValue: [number, number]) => {
      return ~~((((minAndMaxValue[1] - minAndMaxValue[0]) * ((level - 1) / MAXLEVEL) + minAndMaxValue[0]) * value) / 100);
    };
  }
}

export default ClassAttributes;