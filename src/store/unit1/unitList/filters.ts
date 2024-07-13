import { useSWRAsync } from '@/service';
import type { FilterKey, FilterArrType, ListInfo } from './types';

export const unitListFilter = async () => {
  const jobData = (await useSWRAsync("jobData")).job;
  const jobList = Object.values(jobData).filter(p => p.id > 50000);

  let filterCharacterList: ListInfo = [];

  const updateFilterList = (filterKey: Exclude<FilterKey, "summon" | "trait">, ids: number[]) => {
    if (!ids.length) return;

    filterCharacterList = filterCharacterList.reduce((arr: ListInfo, unit) => {
      const value = unit[filterKey];
      ((Array.isArray(value) ? value : [value])).find(p => ids.includes(p)) && arr.push(unit);
      return arr;
    }, []);
  };

  const filterSummon = (ids: number[]) => {
    return jobList.reduce((result: number[], value) => {
      ids.includes(value.summonType) && result.push(value.id);
      return result;
    }, []);
  };

  const filter = (filterKey: FilterKey, value: FilterArrType[]) => {
    if ("list" in value[0]) value = value.flatMap((p) => p.list!);

    let ids = value.reduce((p: number[], v) => (v.is && p.push(v.id), p), []);
    if (filterKey === "summon") {
      filterKey = "classId";
      ids = filterSummon(ids);
    } else if (filterKey === "trait") {
      filterKey = "trait_id_array" as any;
    }

    updateFilterList(filterKey as any, ids);
    return object;
  };

  const result = () => {
    return filterCharacterList;
  };

  const reset = (characterList: ListInfo) => {
    filterCharacterList = characterList;
    return object;
  };

  const object = { reset, result, filter };

  return object;
};