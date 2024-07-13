import { useSWRAsync } from "@/service";
import { IconName, iconItemKey } from "./iconSrc";

export type ItemValue = {
  id: string | number;
  iconKey: IconName;
  name: string;
  rarity: EData.Rarity | EUnit.Rarity;
  text?: string;
  count: number;
  unit?: { category: UNIT.UnitType, id: number; };
  m_probability?: number;
  m_firstProbability?: number;
  sort_priority: number;
};

type Category = (value: QUEST.Reward) => Promise<ItemValue>;

const probability = (value: QUEST.Reward) => {
  if (value.m_probability) {
    return {
      m_probability: value.m_probability,
      m_firstProbability: value.m_firstProbability
    };
  }
};

const itemCategory: ObjIndex<Category> = {
  "attachable": async (value) => {
    const data = await useSWRAsync("attach", true);
    const { name, rarity, text } = data.find(p => p.id === +value.m_walletName)!;

    return {
      id: '',
      iconKey: IconName.attachable,
      name,
      text,
      rarity,
      count: value.m_count,
      sort_priority: 0
    };
  },
  "item": async (value) => {
    const itemTemplate = await useSWRAsync("itemTemplateData", true);
    const { item_id, display_name, rarity, text, sort_priority } = itemTemplate[value.m_walletName];

    let id, key, unit: any;
    if (value.m_walletName.includes("skin")) {
      const skinData = await useSWRAsync("skinData", true);
      const [unitId, skinId] = value.m_walletName.slice(-4).split("_").map(p => +p);

      id = skinData.find(p => p.unit_card_id === unitId && p.skin_id === skinId)!.resource_id;
      key = IconName.unit_s;
    } else if (value.m_walletName.includes("exskill")) {
      id = "ex_skill_key";
      unit = { category: "character", id: value.m_walletName.match(/\d+/)![0] };
    } else if (value.m_walletName.includes("sskill")) {
      id = value.m_walletName.replace(/\d+$/, iconItemKey[rarity]).replaceAll(".", "_");
    }

    return {
      id: id || item_id.replaceAll(".", "_"),
      iconKey: key || IconName.wallet,
      name: display_name,
      rarity,
      text,
      unit,
      count: value.m_count,
      sort_priority
    };
  },
  "equip": async (value) => {
    const data = await useSWRAsync("equipmentData", true);
    const { name, rarity, text, sort_priority } = data.equipment[`item.equip.${value.m_walletName}`];
    return {
      id: value.m_walletName,
      iconKey: IconName.equipment,
      name,
      rarity,
      text,
      count: value.m_count,
      sort_priority
    };
  },
  "unit": async (value) => {
    const data = await useSWRAsync("unitList", true, "character");
    const { text, resource, rarityId, id } = data[value.m_walletName];
    return {
      id: resource,
      iconKey: IconName.unit_s,
      name: text,
      rarity: rarityId,
      text,
      unit: { category: "character", id },
      count: value.m_count,
      sort_priority: 0
    };
  },
  "bom": async (value) => {
    const data = await useSWRAsync("unitList", true, "beastGod");
    const { text, resource, rarityId, id } = data[value.m_walletName];
    return {
      id: resource,
      iconKey: IconName.unit_s,
      name: text,
      rarity: rarityId,
      text,
      unit: { category: "beastGod", id },
      count: value.m_count,
      sort_priority: 0
    };
  },
  "bonus_pass": async (item) => {
    const id = item.m_walletCategory + "_" + item.m_walletName;
    const name = "ミッションパス MP";
    return {
      id,
      iconKey: IconName.wallet,
      name,
      rarity: 17201,
      count: item.m_count,
      sort_priority: 0
    };
  }
};

const getItemFunc: Category = async (item) => {
  const wallet = await useSWRAsync("walletData", true);
  const { name, wallet_name, rarity, text, sort_priority } = wallet[item.m_walletCategory + "_" + item.m_walletName];
  return {
    id: name,
    iconKey: IconName.wallet,
    name: wallet_name,
    rarity,
    text,
    count: item.m_count,
    sort_priority
  };
};

export const getItemValue = async (data: QUEST.Reward[]) => {
  const result: ItemValue[] = [];
  let value;
  for (const item of data) {
    const isCategory = itemCategory[item.m_walletCategory];
    value = isCategory ? await isCategory(item) : await getItemFunc(item);
    result.push(Object.assign(value, probability(item)));
  }
  return result;
};