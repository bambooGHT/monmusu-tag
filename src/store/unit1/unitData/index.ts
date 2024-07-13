import type { UnitDetailAbilitiesData } from "./get";
import type { UnitAbilitiesData, UnitAbilitiesHandler } from "./initUnit/types";
import { initUnit } from "./initUnit";
import { getUnitType, getunitVoiceAndSpine } from "./get";
import monmusuSpine from "./spine";
import monmusuVoice from "./voice";

export { monmusuVoice, monmusuSpine };
export let unitDetailData = {} as UnitDetailAbilitiesData;
export let unitAbilitiesData = {} as UnitAbilitiesData;
export let unitAbilitiesHandler = {} as UnitAbilitiesHandler;

export const createUnit = async (id: string) => {
  if (unitDetailData.id === id) return;

  const unitType = getUnitType(id);
  unitDetailData.unitType = unitType;

  const data = await initUnit(id, unitType);
  unitDetailData = data.unitDetailData;
  unitAbilitiesData = data.unitAbilitiesData;
  unitAbilitiesHandler = data.unitAbilitiesHandler;
};

export const updateVoiceAndSpineResoure = async (resourceId: number, resourceKey?: string) => {
  const { voices, voiceEmotes, spineResource } = await getunitVoiceAndSpine(resourceId, resourceKey);
  monmusuSpine.updateSpineResource(spineResource, resourceId);
  monmusuVoice.updateVoice({ voices, voiceEmotes });
};