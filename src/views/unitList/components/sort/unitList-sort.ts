import { unitListData } from '@/store/unit1/unitList';
import ListSort, { type SortId } from "@/store/unit1/unitList/sort";
import { throttle2 } from '@/utils/throttle';
import { ref } from "vue";

const sort = () => {
  const index = ref(0);
  const reverse = ref<boolean>(false);
  const { current } = unitListData;
  const thr = throttle2(300);

  const toReverse = thr(() => {
    ListSort.reverse(current.value.forList);
    reverse.value = !reverse.value;
  });

  const toSort = thr((id: SortId, i: number) => {
    ListSort.sort(id, current.value.forList, reverse.value);
    index.value = i;
  });

  const sortArr: { name: string, id: SortId; }[] = [
    { name: "id", id: "id" },
    { name: "rarity", id: "rarityId" },
  ];

  return { index, toReverse, toSort, sortArr, reverse };
};

export default sort;