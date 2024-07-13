import MediaQueryHandler from "@/utils/mediaQueryHandler";
import { waterfallLayout } from "@/utils/waterfallLayout";
import { ref, onMounted, nextTick, onUnmounted } from "vue";

const mission = () => {
  const missionDOM = ref<{ DOM: HTMLDivElement; }>();

  let mediaQuery: MediaQueryHandler;
  onMounted(async () => {
    await nextTick();
    if (missionDOM.value?.DOM.children[0]) {
      mediaQuery = new MediaQueryHandler("(max-width: 860px)", async (mql: MediaQueryList) => {
        const count = mql.matches ? 2 : 3;
        waterfallLayout(missionDOM.value!.DOM, count, 5);
      });
    }
  });

  onUnmounted(() => {
    mediaQuery?.remove();
  });

  return { missionDOM };
};

export default mission;