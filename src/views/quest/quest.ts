import { questData, questControl } from "@/store/quest";
import router from '@/router';
import { ref } from 'vue';
import { updatePageMeta } from "@/router/title";

export const loaded = ref(false);

export const quest = async () => {
  loaded.value = false;
  const id = +router.currentParamId;

  if (questData.id === id && questData.currentLevel) {
    await questControl.updateMap();
    loaded.value = true;
    router.replace("quest", id, { levelId: questData.currentLevel.data.id });
    updateTitle();
    return;
  }

  await questControl.updateQuest(id);
  loaded.value = true;

  const levelId = router.getCurrentQuery("quest").levelId;
  await questControl.updateCurrentLevel(levelId ? +levelId : undefined);
  updateTitle();
};

export const updateTitle = () => {
  const { chapterInfo: { name, text }, currentLevel } = questData;
  const { data: { name: levelName, text: levelText } } = currentLevel || { data: {} };
  const description = levelText ? `${levelName} - ${levelText}` : text;
  updatePageMeta(`quest - ${name} ${levelName || ""}`, description);
};