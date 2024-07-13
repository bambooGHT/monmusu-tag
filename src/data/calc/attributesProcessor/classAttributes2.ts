class ClassAttributes2 {
  constructor(private unit: UNIT.Enemy) { }
  getAttributes(revision: number) {
    const {
      life,
      power,
      defense,
      magicDefense,
      attackRange,
      attackSpeed,
      attackInterval,
      moveSpeed,
      targetNum
    } = this.unit;

    const attributes = {
      HP: life,
      ATK: power,
      DEF: defense,
      MDEF: magicDefense,
      Range: attackRange,
      ASPD: attackSpeed,
      Targets: targetNum,
      ACD: attackInterval,
      SPD: moveSpeed,
    };

    const getAttributes = (revision: number) => {
      const newAttributes = {
        HP: Math.floor(life * revision / 100),
        ATK: Math.floor(power * revision / 100),
        DEF: Math.floor(defense * revision / 100),
        MDEF: Math.floor(magicDefense * revision / 100),
      };
      return Object.assign({}, attributes, newAttributes);
    };
    this.getAttributes = getAttributes;
    return getAttributes(revision);
  }
};
export default ClassAttributes2;