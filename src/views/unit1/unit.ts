import router from "@/router";
import { onBeforeMount } from "vue";
import { createUnit, monmusuSpine, monmusuVoice, unitDetailData, updateVoiceAndSpineResoure } from "@/store/unit1/unitData";
import { ref } from "vue";
import unitInfo from "./info";
import unitAbilities from "./abilities";
import voice from "./voiceAndAnimation/components/voice";
import animation from "./voiceAndAnimation/components/animation";
import { updatePageMeta } from "@/router/title";

export const tabNames = ["info", "abilities", "voice", "animation"] as const;
export const conmponents = {
  "info": unitInfo,
  abilities: unitAbilities,
  voice,
  animation
};

export const loading = ref(false);
export const mediaMatch = ref(false);
export const currentTab = ref<typeof tabNames[number]>("info");
export const updateMediaMatch = (match: boolean) => {
  if (["voice", "animation"].includes(currentTab.value)) {
    currentTab.value = "info";
  }
  mediaMatch.value = match;
};

export const reset = () => {
  monmusuVoice.resetData();
  monmusuSpine.destroy();
  monmusuVoice.stop();
};

export const init = () => {
  onBeforeMount(async () => {
    const id = router.currentParamId;
    loading.value = true;
    await createUnit(id);
    await updateVoiceAndSpineResoure(unitDetailData.unit.resource);
    loading.value = false;
    const unitName = `【${unitDetailData.unit.nickname || "なし"}】${unitDetailData.unit.charaName}`;
    const description = unitDetailData.picturebook?.text;
    updatePageMeta(`${unitDetailData.unitType} - ${unitName}`, `${unitName}${description ? " - " + description : ""}`);
  });
};