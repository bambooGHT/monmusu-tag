import AbilityTextProcess from "@/data/calc/abilitiesTextProcessor/ability";
import SkillTextProcess from "@/data/calc/abilitiesTextProcessor/skill";
import type { InterpolationTime } from "@/data/calc/abilitiesTextProcessor/types";
import type { CalcAbilitiesProps } from "@/data/calc/types";

export type AbilitiesUpdateParams = {
  FPS: number;
  skill: {
    data: UNIT.Skill[],
    interpolationTime: InterpolationTime;
    maxLevel: number;
  };
  abilityList: {
    data: ABILITIES.Ability[],
    maxLevel: number;
  };
};

type UpdateTextClass = {
  skillText: SkillTextProcess;
  abilityText: AbilityTextProcess;
};

export class AbilitiesUpdate {
  private updateTextClass: UpdateTextClass;
  constructor(params: AbilitiesUpdateParams) {
    const { skill, FPS, abilityList } = params;
    const props = <CalcAbilitiesProps>{ FPS };

    this.updateTextClass = {
      skillText: new SkillTextProcess({
        list: skill.data,
        maxLevel: skill.maxLevel,
        interpolationTime: skill.interpolationTime,
        props
      }),
      abilityText: new AbilityTextProcess({
        list: abilityList.data,
        maxLevel: abilityList.maxLevel
      })
    };
  }

  getSkillText(index: number, level: number) {
    const { updateTextClass } = this;
    return updateTextClass.skillText.getValue(index, level);
  }

  getAbilityText(index: number, level: number) {
    const { updateTextClass } = this;
    return updateTextClass.abilityText.getValue(index, level);
  }
}