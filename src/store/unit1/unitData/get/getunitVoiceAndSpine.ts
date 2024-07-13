import { useSWRAsync } from '@/service';

type UnitVoiceAndSpine = UNIT.VoiceData & {
  spineResource: UNIT.SpineResource;
};
export const unitVoiceAndSpine = new Map<string, UnitVoiceAndSpine>();

export const getunitVoiceAndSpine = async (resource: number, resourceKey?: string) => {
  const key = resource + (resourceKey || "");
  let data = unitVoiceAndSpine.get(key);
  if (!data) {
    const params = { id: resource, key: resourceKey };
    const { voices, voiceEmotes } = await useSWRAsync("unitVoice", false, resource);
    const spineResource = await useSWRAsync("unitSpineResource", false, params);
    data = { spineResource, voices, voiceEmotes };
    unitVoiceAndSpine.set(key, data);
  }

  return data;
};