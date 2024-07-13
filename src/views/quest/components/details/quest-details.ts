import { ref } from "vue";
import chapterInfo from "./components/chapterInfo";
import levelInfo from "./components/levelInfo";
import enemyInfo from "./components/enemyInfo";
import enemyRoute from "./components/route";
import mapOptions from "./components/options";
import levelTimeline from "./components/levelTimeline";
import levelList from "../levelList";

export const components = { "level list": levelList, chapter: chapterInfo, level: levelInfo, enemy: enemyInfo, route: enemyRoute, "timeline":levelTimeline, options: mapOptions };
export const currentTab = ref<keyof typeof components>("chapter");
export const mediaMatch = ref(false);
export const updateMediaMatch = (match: boolean) => {
  if (currentTab.value === "level list") {
    currentTab.value = "chapter";
  }
  mediaMatch.value = match;
};