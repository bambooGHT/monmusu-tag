import { computed, ref } from "vue";
import { questData } from '@/store/quest';
import type { Timeline } from "@/store/quest/types";

export const currentTimeline = ref<Timeline>();

export const timeline = () => {
  const timelineEvent = ref<HTMLDivElement>();

  const levelTimelineEvents = computed(() => {
    if (!questData.currentLevel) return undefined;

    const value = questData.currentLevel.detailedData.timelineList;
    if (timelineEvent.value) {
      timelineEvent.value.children.item(0)!.scrollTop = 0;
      timelineEvent.value.children.item(1)!.scrollTop = 0;
    }
    currentTimeline.value = value[0];
    return value;
  });

  const updateCurrentTimeline = (event: Timeline) => {
    currentTimeline.value = event;
    const children = timelineEvent.value!.children.item(1);
    if (children) children.scrollTop = 0;
  };

  return { levelTimelineEvents, timelineEvent, updateCurrentTimeline };
};