import { unitListData, unitListFilter } from '@/store/unit1/unitList';
import type { ListInfo, TokenInfo } from '@/store/unit1/unitList/types';
import { computed, onMounted, ref } from 'vue';

type valueType = { is: boolean; list?: { is: boolean; }[]; };

const filter = () => {
  const jobIndex = ref(0);
  const { current, filterData, resetFilter, applyFilter } = unitListData;
  const filterListLen = computed(() => {
    return [...current.value.showState.values()].reduce((count, v) => (v && count++, count), 0);
  });
  let filter: (ReturnType<typeof unitListFilter> extends Promise<infer V> ? V : never);

  onMounted(async () => {
    filter = await unitListFilter();
  });

  const toggleFilterJob = (job: valueType) => {
    job.is = !job.is;
    if (job.list) {
      for (const p of job.list) {
        p.is = job.is;
      }
    } else {
      const currentJob = filterData.value.job[jobIndex.value];
      currentJob.is = currentJob.list.every(p => p.is);
    }
  };

  const apply = () => {
    const filteredList = filterCategory[current.value.type]();
    applyFilter(filteredList);
  };

  const filterCategory: ObjIndex<Function> = {
    "character": () => {
      return filter.reset(current.value.list as ListInfo)
        .filter("receiveType", filterData.value.move)
        .filter("summon", filterData.value.summon)
        .filter("classId", filterData.value.job)
        .filter("rarityId", filterData.value.rarity)
        .filter("element", filterData.value.attr)
        .filter("trait", filterData.value.trait)
        .result();
    },
    "token": () => {
      return filter.reset((<TokenInfo>current.value.list).map(p => p.unit))
        .filter("trait", filterData.value.trait)
        .result();
    }
  };
  return {
    jobIndex, filterData, resetFilter, toggleFilterJob, apply,
    current, filterListLen
  };
};

export default filter;
