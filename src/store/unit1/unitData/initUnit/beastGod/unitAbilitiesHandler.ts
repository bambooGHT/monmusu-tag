import { AbilitiesUpdate } from "./abilitiesUpdate";
import type { BeastGodAbilitiesData } from "../types";
import type { AbilitiesUpdateParams } from "./abilitiesUpdate";

class UnitAbilitiesHandler {
  abilitiesUpdateClass: AbilitiesUpdate;
  constructor(params: AbilitiesUpdateParams, public unitData: BeastGodAbilitiesData) {
    this.abilitiesUpdateClass = new AbilitiesUpdate(params);
    this.updateSkill(0, 0);
    this.updateAbility(0, 0);
  }

  updateAbility(index: number, level: number) {
    const { abilitiesUpdateClass, unitData } = this;
    const { abilityList } = unitData;
    const text = abilitiesUpdateClass.getAbilityText(index, level);

    abilityList.level = abilityList.index === index ? level : 0;
    abilityList.index = index;
    abilityList.text = text;
  }

  updateSkill(index: number, level: number) {
    const { unitData, abilitiesUpdateClass } = this;
    const { skill } = unitData;
    skill.level = skill.index === index ? level : 0;
    skill.index = index;

    const { text: skillText, time } = abilitiesUpdateClass.getSkillText(index, skill.level);
    skill.text = skillText;
    skill.time = time;
  }
}

export default UnitAbilitiesHandler;
