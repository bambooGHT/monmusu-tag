import { ref } from "vue";
import type { ListInfo, TokenInfo, UnitdisplayState } from "./types";
import { useSWRAsync } from "@/service";
import unitFilterJson from '@/assets/unitFilters.json';

const initUnitListData = () => {
  const filterData = ref(unitFilterJson);
  const unitdisplayState = {} as Record<UNIT.UnitType, UnitdisplayState>;
  const current = ref<{
    type: UNIT.UnitType,
    list: ListInfo | TokenInfo;
    showState: UnitdisplayState;
    forList: ListInfo | TokenInfo;
  }>({
    type: <UNIT.UnitType>"",
    list: [],
    showState: new Map(),
    forList: []
  });

  const resetFilter = () => {
    filterData.value = JSON.parse(JSON.stringify(filterData.value).replaceAll("true", "false"));
  };

  const applyFilter = (filterList: ListInfo) => {
    const list = current.value.list as any;
    const ids = new Set<number>(filterList.map((p) => p.id));
    const isToken = current.value.type === "token";

    for (const item of list) {
      current.value.showState.set(item.id, ids.has(isToken ? item.unit.id : item.id));
    }
  };

  const toggleUnitList = async (type?: UNIT.UnitType) => {
    if (!type || type === current.value.type) return;
    const list = await initUnitList(type);
    current.value = { type, list, showState: unitdisplayState[type], forList: [] };
    segment(0);
  };

  const segment = (index: number) => {
    const { list, forList } = current.value;
    const sliceList = list.slice(index, index + 200) as any[];
    forList.push(...sliceList);

    if (forList.length === list.length) return;
    setTimeout(() => {
      segment(index + 200);
    }, 500);
  };

  const initUnitList = async (type: UNIT.UnitType) => {
    const unitData = await useSWRAsync("unitList", true, type);
    let value: any[] = Object.values(unitData);

    if (type === "token") {
      const characters = await useSWRAsync("unitList", true, "character");

      const tokenData = Object.values(await useSWRAsync("tokenData"));
      value = tokenData.map((p) => {
        const unit: any = (<ObjIndex<UNIT.Token>>unitData)[p.summonIndex] || characters[p.summonIndex];
        const isItself = characters[p.summonIndex] ? true : false;
        return {
          id: p.id,
          unit,
          isItself
        };
      });
    }

    if (!unitdisplayState[type]) {
      unitdisplayState[type] = new Map();
      for (const item of value) {
        unitdisplayState[type].set(item.id, true);
      }
    }

    return value;
  };

  return {
    current,
    filterData,
    resetFilter,
    applyFilter,
    toggleUnitList
  };
};

export const unitListData = initUnitListData();