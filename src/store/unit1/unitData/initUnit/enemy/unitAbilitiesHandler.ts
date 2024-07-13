import { AbilitiesUpdate } from "./abilitiesUpdate";
import type { EnemyAbilitiesData } from "../types";
import type { AbilitiesUpdateParams } from "./abilitiesUpdate";

class UnitAbilitiesHandler {
  abilitiesUpdateClass: AbilitiesUpdate;
  constructor(params: AbilitiesUpdateParams, public unitData: EnemyAbilitiesData) {
    this.abilitiesUpdateClass = new AbilitiesUpdate(params);
    const enemyRevision = unitData.entranceMap.list[0]?.enemyRevision || 100;
    this.updateAbility(0);
    this.updateAttributes(enemyRevision);
  }

  updateAttributes(revision: number) {
    const { abilitiesUpdateClass, unitData } = this;
    unitData.attributes = abilitiesUpdateClass.getAttributes(revision);
  }

  updateAbility(index: number) {
    const { abilitiesUpdateClass, unitData } = this;
    const text = abilitiesUpdateClass.getAbilityText(index);
    unitData.abilityList.index = index;
    unitData.abilityList.text = text;
  }

  updateCurrentMap(map: UNIT.EnemyEntranceMaps[0]) {
    const { unitData } = this;
    unitData.entranceMap.current = map;
    this.updateAttributes(map.enemyRevision);
  }
}

export default UnitAbilitiesHandler;
