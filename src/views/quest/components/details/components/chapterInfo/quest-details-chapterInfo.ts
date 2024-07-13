import { questData } from "@/store/quest";
import { computed, ref } from "vue";

export const rewardsList = computed(() => {
  const list = (Object.values(questData.rewardsList || {})).reduce((result: Record<string, ObjIndex<any> & { type: EQuest.RewardsCategory; }>, value) => {
    result[value.title] = value;
    return result;
  }, {});
  return list;
});

export const currentTab = ref("");
export const tabList = computed(() => {
  const list = Object.keys(rewardsList.value);
  if (questData.missionList?.length) {
    list.unshift("mission");
  }
  currentTab.value = list[0];
  return list;
});