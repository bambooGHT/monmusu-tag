import AttributesAbs from "./attributesAbs";
import AttributesProcess from "./attributesProcess";

class AwakeningAttributes extends AttributesAbs<ABILITIES.Ability[]> {
  getAttributes() {
    const { props, data } = this;
    const AttributeCalculationFn = Object.values(AttributesProcess.getAttributeCalculationFunction(data)).flat(1);

    const getAttributes = () => {
      let result = {} as ABILITIES.Attributes;
      if (props.awakening) {
        const attributes1 = AttributesProcess.calcBaseAttributes(props.attributes, AttributeCalculationFn);
        const attributes2 = AttributesProcess.addUpAttributes(props.attributes, attributes1);
        result = attributes2;
      }
      return result;
    };

    this.getAttributes = getAttributes;
    return getAttributes();
  }
}
export default AwakeningAttributes;