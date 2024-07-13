import { defineAsyncComponent, reactive, ref } from 'vue';

export const currentQuest = ref("" as keyof typeof quests);

export const quests = {
  main: defineAsyncComponent(() => import('./components/main')),
  eventList: defineAsyncComponent(() => import('./components/eventList')),
  bossList: defineAsyncComponent(() => import('./components/bossList')),
  other: defineAsyncComponent(() => import('./components/other')),
};