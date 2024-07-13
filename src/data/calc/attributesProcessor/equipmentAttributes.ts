import AttributesAbs from "./attributesAbs";

type EquipmentList = [ABILITIES.AttributeNames, number][];

class EquipmentAttributes extends AttributesAbs<DATA.Equipment[][]> {
  getAttributes(index: number): ABILITIES.Attributes {
    const equipmentList: EquipmentList[] = [];
    for (const item of this.data) {
      equipmentList.push(this.#calculateAttributes(item, {
        HP: 0,
        ATK: 0,
        DEF: 0,
        MDEF: 0,
        Range: 0,
        ASPD: 0,
        ACD: 0
      }));
    }

    const getAttributes = (index: number) => {
      const attributes = { ...this.props.attributes };

      if (equipmentList[index]) {
        for (const [key, value] of equipmentList[index] ?? []) {
          attributes[key] += value;
        }
      }
      return attributes;
    };

    this.getAttributes = getAttributes;
    return getAttributes(index);
  };
  //计算武器属性值
  #calculateAttributes(value: DATA.Equipment[], data: ABILITIES.EqAttributes): EquipmentList {
    const eqAttributes = value.reduce((prev, curr) => ({
      HP: prev.HP + curr.min_life,
      ATK: prev.ATK + curr.min_power,
      DEF: prev.DEF + curr.min_defense,
      MDEF: prev.MDEF + curr.min_magic_resist,
      Range: prev.Range + curr.min_range,
      ASPD: prev.ASPD + curr.min_attack_speed,
      ACD: prev.ACD + curr.min_attack_interval,
    }), data);

    return Object.entries(eqAttributes) as EquipmentList;
  }
}

export default EquipmentAttributes;