import type { CharacterAbilitiesData } from "../types";
import type { AbilitiesUpdateParams } from "./abilitiesUpdate";
import { AbilitiesUpdate } from "./abilitiesUpdate";

class UnitAbilitiesHandler {
  abilitiesUpdateClass: AbilitiesUpdate;
  constructor(params: AbilitiesUpdateParams, public unitData: CharacterAbilitiesData, public classLevel: number) {
    this.abilitiesUpdateClass = new AbilitiesUpdate(params);
    this.updateAbilities();
  }

  updateAbilities() {
    this.updateAttributes();
    this.updateAbilitiesText();
  }

  updateAwakening(awakening: boolean) {
    this.abilitiesUpdateClass.updateAwakening(awakening);
    this.updateAbilities();
  }

  updateUniqueWeapon(apply: boolean) {
    this.abilitiesUpdateClass.updateUniqueWeapon(apply);
    this.updateAbilities();
  }

  updateClass(index: number) {
    const { unitData } = this;

    this.#updateClass(index);
    if (index !== 0 && unitData.equipmentIndex !== index) {
      this.#updateEquipment(-1);
    }
  }

  #updateClass(index: number) {
    this.unitData.classIndex = index;
  }

  updateEquipmentIndex(index: number) {
    const { unitData, classLevel } = this;
    index = unitData.equipmentIndex === index ? -1 : index;
    this.#updateEquipment(index);

    if (index !== -1 && index !== unitData.classIndex) {
      this.#updateClass(index);
      this.#updateLevel(((index === 0 ? index + 1 : index) * classLevel));
    }
    this.updateAbilities();
  }

  #updateEquipment(index: number) {
    this.unitData.equipmentIndex = index;
  }

  updateLevel(lv: number) {
    const { unitData, classLevel } = this;
    const { classIndex, equipmentIndex } = unitData;

    this.#updateLevel(lv);
    if (!EUnit.CLASS_PHASE[lv]) {
      const ClassIndex = ~~((lv - 1) / classLevel);
      if (ClassIndex !== classIndex) {
        this.#updateClass(ClassIndex);
        if (equipmentIndex) this.#updateEquipment(-1);
      }
    }

    this.updateAbilities();
  }

  #updateLevel(lv: number) {
    const { unitData } = this;
    const { expInfo, expList, level } = unitData;
    level.levelExp = expList[lv - 1];
    level.needExpPropsNum = expInfo.map((p) => {
      return Math.ceil(level.levelExp / p.exp_point);
    });
    level.currentLevel = lv;
  }

  updateUwIndex(index: number) {
    const { unitData } = this;
    
    unitData.uwIndex = index;
    this.updateAbilities();
  }

  updateAttributes() {
    const { abilitiesUpdateClass, unitData } = this;
    const { classIndex, equipmentIndex, uwIndex, level } = unitData;
    const attributes = abilitiesUpdateClass.getAttributes(level.currentLevel, classIndex, equipmentIndex, uwIndex);

    if (attributes.Targets === -1) attributes.Targets = "ALL";
    attributes.CRIT_RATE += "%";
    attributes.CRIT_DAMAGE += "%";
    unitData.attributes = attributes;
  }

  updateAbilitiesText() {
    const { abilitiesUpdateClass, unitData, } = this;
    const { skill, jobFeature, raceFeature, classIndex } = unitData;
    const jobFeatureText = abilitiesUpdateClass.getJobFeatureText(classIndex);
    const raceFeatureText = abilitiesUpdateClass.getRaceFeatureText();

    this.updateSkill(skill.index, skill.level);
    jobFeature.text = jobFeatureText;
    raceFeature.text = raceFeatureText;
  }

  updateSkill(index: number, level: number) {
    const { abilitiesUpdateClass, unitData } = this;
    const { skill } = unitData;

    skill.level = skill.index === index ? level : 0;
    skill.index = index;

    const { text: skillText, time } = abilitiesUpdateClass.getSkillText(index, skill.level);
    skill.text = skillText;
    skill.time = time;
  }
}

export default UnitAbilitiesHandler;