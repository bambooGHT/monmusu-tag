import AttributesAbs from "./attributesAbs";
import attributesProcess from "./attributesProcess";

class RaceFeatureAttributes extends AttributesAbs<ABILITIES.Ability[]> {
  getAttributes() {
    const { props, data } = this;
    const AttributeCalculationFn = attributesProcess.getAttributeCalculationFunction(data);

    const getAttributes = () => {
      let result = {} as ABILITIES.Attributes;
      let attributes1 = attributesProcess.calcBaseAttributes(props.attributes, AttributeCalculationFn.calcFn);
      if (props.awakening) {
        const attributes2 = attributesProcess.calcBaseAttributes(props.attributes, AttributeCalculationFn.awakeningCalcFn);
        attributes1 = attributesProcess.addUpAttributes2(attributes1, attributes2);
      }
      result = attributesProcess.addUpAttributes(props.attributes, attributes1);
      return result;
    };

    this.getAttributes = getAttributes;
    return getAttributes();
  }
}

export default RaceFeatureAttributes;