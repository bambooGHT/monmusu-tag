import AbilityTextProcess from "@/data/calc/abilitiesTextProcessor/ability";
import ClassAttributes2 from "@/data/calc/attributesProcessor/classAttributes2";

export type AbilitiesUpdateParams = {
  FPS: number;
  unit: UNIT.Enemy;
  abilityList: {
    data: ABILITIES.Ability[],
    maxLevel: number;
  };
};

type UpdateAttrClass = {
  classAttr: ClassAttributes2;
};
type UpdateTextClass = {
  abilityText: AbilityTextProcess;
};

export class AbilitiesUpdate {
  private updateAttrClass: UpdateAttrClass;
  private updateTextClass: UpdateTextClass;

  constructor(params: AbilitiesUpdateParams) {
    const { abilityList, unit } = params;

    this.updateAttrClass = {
      classAttr: new ClassAttributes2(unit)
    };
    this.updateTextClass = {
      abilityText: new AbilityTextProcess({
        list: abilityList.data,
        maxLevel: abilityList.maxLevel
      })
    };
  }

  getAttributes(revision: number) {
    return this.updateAttrClass.classAttr.getAttributes(revision);
  }

  getAbilityText(index: number) {
    const { updateTextClass } = this;
    return updateTextClass.abilityText.getValue(index);
  }
}