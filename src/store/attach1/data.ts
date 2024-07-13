import { shallowReactive } from "vue";
import { useSWRAsync } from "@/service";
import { attachConditionFilter } from "./attachCondition";
import { getItemValue } from '@/data';
import type { Attach, AttachUpdate, AttachList } from "./types";

export const attach = shallowReactive(<Attach & AttachUpdate>{
  list: [] as any[],
  attachGetWays: {},
  suitableCharacters: [] as any[]
});

(async () => {
  const data = {} as Attach & AttachUpdate;

  const attachLiat = await useSWRAsync("attach", true);
  const { shopData, attachObtainWays } = await useSWRAsync("attachObtainWays", false);

  let i = 0;
  data.list = attachLiat.reduce((result: AttachList[], value) => {
    const v: any = value;
    result.push(v);
    value.talentList.forEach((p) => {
      for (const item of p.activeData) {
        if (attachConditionFilter.find(p => item.type === p.type)) {
          if (!v.condition) i += 1;
          v.condition = true;
          break;
        }
      }
    });
    return result;
  }, []);
  data.conditionFilterLength = i;
  data.shopData = shopData;
  data.attachGetWays = attachObtainWays;
  data.updateAttach = async (value?: AttachList) => {
    if (attach.currentAttach === value) return;
    attach.currentAttach = value;

    let character: UNIT.Character[] = [];
    if (value?.condition) {
      character = Object.values(await useSWRAsync("unitList", true, "character"));
      const activeDataList = value.talentList.flatMap(p => p.activeData);

      for (const item of activeDataList) {
        const filterFunc = attachConditionFilter.find(v => v.type === item.type)?.filterFunc;
        if (filterFunc) {
          character = await filterFunc(item, character);
        }
      }
    }
    const tokenTalentList = value?.talentList.filter(p => p.talentId === EData.BattleTalentId.battleTokenMember) || [];
    if (tokenTalentList[0]) {
      const tokens = await useSWRAsync("unitList", true, "token");
      const tokenDatas = await useSWRAsync("tokenData");
      attach.attachAssocTokens = tokenTalentList.map(p => {
        const id = p.param[0];
        const tokenData = tokenDatas[id];
        
        return {
          unit: tokens[tokenData.summonIndex],
          id: id
        };
      });
    } else {
      attach.attachAssocTokens = undefined;
    }

    attach.suitableCharacters = character;
  };
  data.updateShop = async (id?: number | string) => {
    if (!id || attach.currentShopItem?.commodity.id === id) {
      attach.currentShopItem = undefined;
      return;
    }
    const commodity = attach.shopData[id!];
    if (!commodity) return;

    const items = await getItemValue(commodity.shopItems);
    attach.currentShopItem = { commodity, items };
  };

  Object.assign(attach, data);
})();