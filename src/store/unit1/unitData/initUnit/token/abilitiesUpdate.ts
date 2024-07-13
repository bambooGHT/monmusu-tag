import ClassAttributes from "@/data/calc/attributesProcessor/classAttributes";
import SkillTextProcess from "@/data/calc/abilitiesTextProcessor/skill";
import AbilityTextProcess from "@/data/calc/abilitiesTextProcessor/ability";
import type { CalcAbilitiesProps } from "@/data/calc/types";
import type { InterpolationTime } from "@/data/calc/abilitiesTextProcessor/types";

export type AbilitiesUpdateParams = {
  FPS: number;
  maxLevel: number;
  unit: UNIT.Token;
  jobs: DATA.Job[];
  skill: {
    data: UNIT.Skill[],
    interpolationTime: InterpolationTime | number;
    maxLevel: number;
  };
  abilityList: ABILITIES.Ability[];
};

type UpdateAttrClass = {
  classAttr: ClassAttributes;
};

type UpdateTextClass = {
  skillText: SkillTextProcess;
  abilityText: AbilityTextProcess;
};

export class AbilitiesUpdate {
  private updateAttrClass: UpdateAttrClass;
  private updateTextClass: UpdateTextClass;
  private props: CalcAbilitiesProps;

  constructor(params: AbilitiesUpdateParams) {
    const { unit, jobs, skill, FPS, maxLevel, abilityList } = params;
    const props = <CalcAbilitiesProps>{ FPS };

    this.updateAttrClass = {
      classAttr: new ClassAttributes({ unit, jobs, maxLevel }),
    };
    this.updateTextClass = {
      skillText: new SkillTextProcess({
        list: skill.data,
        maxLevel: skill.maxLevel,
        interpolationTime: skill.interpolationTime,
        props
      }),
      abilityText: new AbilityTextProcess({ list: abilityList, props })
    };
    this.props = props;
  }

  getAttributes(level: number) {
    const { props, updateAttrClass } = this;
    props.attributes = updateAttrClass.classAttr.getAttributes(level);
    return props.attributes;
  }

  getSkillText(levelIndex: number, level: number) {
    const { updateTextClass } = this;
    const skill = updateTextClass.skillText.getValue(levelIndex, level);
    return skill;
  }

  getAbilityText(index: number) {
    return this.updateTextClass.abilityText.getValue(index);
  }
}