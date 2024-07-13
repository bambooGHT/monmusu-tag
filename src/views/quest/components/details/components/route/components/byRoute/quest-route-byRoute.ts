import { questData } from "@/store/quest";
import type { EnemyDeployValue } from "@/store/quest/types";
import { waterfallLayout } from "@/utils/waterfallLayout";
import { nextTick, ref, computed } from "vue";

const byRoute = () => {
  const routeDOM = ref<HTMLUListElement>();

  const getTotal = (data: EnemyDeployValue[] = []) => {
    return data.reduce((total: number, value) => {
      total += value.count;
      return total;
    }, 0);
  };

  const arrangeElementsInColumns = async () => {
    if (routeDOM.value) {
      await nextTick();
      waterfallLayout(routeDOM.value, 2);
    }
  };

  const routeList = computed(() => {
    arrangeElementsInColumns();
    return questData.currentLevel?.detailedData.enemyDeployCount.enemyDeployRoutesCount;
  });

  return { routeDOM, getTotal, arrangeElementsInColumns, routeList };
};

export default byRoute;