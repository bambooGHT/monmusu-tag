import { AbilitiesUpdate } from "./abilitiesUpdate";
import type { TokenAbilitiesData } from "../types";
import type { AbilitiesUpdateParams } from "./abilitiesUpdate";

class UnitAbilitiesHandler {
  abilitiesUpdateClass: AbilitiesUpdate;
  constructor(params: AbilitiesUpdateParams, public unitData: TokenAbilitiesData) {
    this.abilitiesUpdateClass = new AbilitiesUpdate(params);
    this.updateAttributes();
    this.updateSkill(0, 0);
    this.updateAbility(0);
  }

  updateAttributes() {
    const { abilitiesUpdateClass, unitData } = this;
    const attributes = abilitiesUpdateClass.getAttributes(unitData.level.currentLevel);

    if (attributes.Targets === -1) attributes.Targets = "ALL";
    attributes.COST = unitData.tokenData.cost;
    unitData.attributes = attributes;
  }

  updateLevel(lv: number) {
    const { unitData: { level } } = this;
    level.currentLevel = lv;
    this.updateAttributes();
  }

  updateAbility(index: number) {
    const { abilitiesUpdateClass, unitData } = this;
    const text = abilitiesUpdateClass.getAbilityText(index);
    unitData.abilityList.index = index;
    unitData.abilityList.text = text;
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
