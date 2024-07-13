import { UniqueWeaponAttributeKeys } from "../enums";
import AttributesAbs from "./attributesAbs";
import AttributesProcess from "./attributesProcess";

type UniqueWeaponAttributesNameEntries = [keyof typeof UniqueWeaponAttributeKeys, UniqueWeaponAttributeKeys][];

class UniqueWeaponAttributes extends AttributesAbs<UNIT.UniqueWeaponData> {
  getAttributes(index: number) {
    const { data, props } = this;
    const { list, ability } = data;
    const AttributeCalculationFn = Object.values(AttributesProcess.getAttributeCalculationFunction([ability])).flat(1);

    const getAttributes = (index: number) => {
      if (!props.uniqueWeapon) return {} as ABILITIES.Attributes;

      const uw = list[index];
      const uniqueWeaponValue = {} as ABILITIES.Attributes;

      for (const [key, atteKey] of Object.entries(UniqueWeaponAttributeKeys) as UniqueWeaponAttributesNameEntries) {
        const value = uw[key];
        if (value) uniqueWeaponValue[atteKey] = value;
      }

      const attributes1 = AttributesProcess.calcBaseAttributes(props.attributes, AttributeCalculationFn);
      const attributes2 = AttributesProcess.addUpAttributes2(attributes1, uniqueWeaponValue);
      const result = AttributesProcess.addUpAttributes(props.attributes, attributes2);
      return result;
    };

    this.getAttributes = getAttributes;
    return getAttributes(index);
  }
}

export default UniqueWeaponAttributes;