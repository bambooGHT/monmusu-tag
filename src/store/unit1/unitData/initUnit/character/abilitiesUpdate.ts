import ClassAttributes from "@/data/calc/attributesProcessor/classAttributes";
import SkillTextProcess from "@/data/calc/abilitiesTextProcessor/skill";
import AbilityTextProcess from "@/data/calc/abilitiesTextProcessor/ability";
import AwakeningAttributes from "@/data/calc/attributesProcessor/awakeningAttributes";
import EquipmentAttributes from "@/data/calc/attributesProcessor/equipmentAttributes";
import RaceFeatureAttributes from "@/data/calc/attributesProcessor/raceFeatureAttributes";
import UniqueWeaponAttributes from "@/data/calc/attributesProcessor/uniqueWeaponAttributes";

import type { CalcAbilitiesProps } from "@/data/calc/types";
import type { InterpolationTime } from "@/data/calc/abilitiesTextProcessor/types";

export type AbilitiesUpdateParams = {
  FPS: number;
  classLevelCoefficient: number;
  unit: UNIT.Character;
  jobs: DATA.Job[];
  jobFeature: ABILITIES.Ability[];
  raceFeature: UNIT.RaceFeature;
  equipments: DATA.Equipment[][];
  awakenings: UNIT.Awakenings[];
  uniqueWeapon?: UNIT.UniqueWeaponData;
  skill: {
    data: UNIT.Skill[],
    interpolationTime: InterpolationTime | number;
    maxLevel: number;
  };
};

type UpdateAttrClass = {
  classAttr: ClassAttributes;
  awakeningAttr: AwakeningAttributes;
  equipmentAttr: EquipmentAttributes;
  raceFeatureAttr: RaceFeatureAttributes;
  uniqueWeaponAttr?: UniqueWeaponAttributes;
};

type UpdateTextClass = {
  raceFeatureText: AbilityTextProcess;
  jobFeatureText: AbilityTextProcess;
  skillText: SkillTextProcess;
};

export class AbilitiesUpdate {
  private updateAttrClass: UpdateAttrClass;
  private updateTextClass: UpdateTextClass;
  private props: CalcAbilitiesProps;

  constructor(params: AbilitiesUpdateParams) {
    const { unit, jobs, skill, raceFeature, jobFeature, awakenings, equipments, uniqueWeapon, FPS, classLevelCoefficient } = params;
    const props = <CalcAbilitiesProps>{ FPS, awakening: false };

    this.updateAttrClass = {
      classAttr: new ClassAttributes({ unit, jobs, classLevelCoefficient }),
      awakeningAttr: new AwakeningAttributes(awakenings, props),
      equipmentAttr: new EquipmentAttributes(equipments, props),
      raceFeatureAttr: new RaceFeatureAttributes([raceFeature], props),
      uniqueWeaponAttr: uniqueWeapon ? new UniqueWeaponAttributes(uniqueWeapon, props) : undefined,
    };
    this.updateTextClass = {
      raceFeatureText: new AbilityTextProcess({ list: [raceFeature], props }),
      jobFeatureText: new AbilityTextProcess({ list: jobFeature, props }),
      skillText: new SkillTextProcess({
        list: skill.data,
        maxLevel: skill.maxLevel,
        interpolationTime: skill.interpolationTime,
        props
      })
    };
    this.props = props;
  }

  getAttributes(level: number, classIndex: number, eqIndex: number, uwIndex: number) {
    const { props, updateAttrClass } = this;
    props.attributes = updateAttrClass.classAttr.getAttributes(level, classIndex);
    Object.assign(props.attributes, updateAttrClass.awakeningAttr.getAttributes());
    Object.assign(props.attributes, updateAttrClass.raceFeatureAttr.getAttributes());
    if (updateAttrClass.uniqueWeaponAttr) {
      Object.assign(props.attributes, updateAttrClass.uniqueWeaponAttr.getAttributes(uwIndex));
    }
    Object.assign(props.attributes, updateAttrClass.equipmentAttr.getAttributes(eqIndex));

    return props.attributes;
  }

  getSkillText(levelIndex: number, level: number) {
    const { updateTextClass } = this;
    const skill = updateTextClass.skillText.getValue(levelIndex, level);
    return skill;
  }

  getJobFeatureText(index: number) {
    return this.updateTextClass.jobFeatureText.getValue(index);
  }

  getRaceFeatureText() {
    return this.updateTextClass.raceFeatureText.getValue();
  }

  updateAwakening(awakening: boolean) {
    this.props.awakening = awakening;
  }

  updateUniqueWeapon(uniqueWeapon: boolean) {
    this.props.uniqueWeapon = uniqueWeapon;
  }
}