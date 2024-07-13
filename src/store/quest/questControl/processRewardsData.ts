import { getIcon, getItemValue } from "@/data";
import { Url, useSWRAsync } from "@/service";
import type { EventKillReward, RewardsType, StarRatingReward } from "../types";

/** 报酬类型 */
export const rewardsType = {
  [EQuest.RewardsCategory.TYPE_1]: async (rewards: QUEST.Shop[]): Promise<RewardsType["1"]> => {
    rewards.sort((a, b) => b.sort_priority - a.sort_priority);
    const icon = Url(getIcon.wallet(rewards[0].price_name));
    const list = await getItemValue(rewards.flatMap((value) => (<QUEST.Shop>value).shopItems));

    return {
      icon,
      list,
      rawList: rewards
    };
  },
  [EQuest.RewardsCategory.TYPE_2]: async (rewards: QUEST.EventStarRatingReward[]): Promise<RewardsType["2"]> => {
    const characters = await useSWRAsync("unitList", true, "character");
    const character = characters[rewards[0].card_id];
    const list: StarRatingReward[] = await rewards.reduce(async (result: any, value) => {
      result = await result;

      if (value.reward) {
        (<any>value).reward = (await getItemValue([value.reward]))[0];
      }

      result.push(value);
      return result;
    }, Promise.resolve([]));
    return {
      character,
      list,
      rawList: rewards
    };
  },
  [EQuest.RewardsCategory.TYPE_3]: async (rewards: QUEST.EventKillReward[]): Promise<RewardsType["3"]> => {
    const list: ObjIndex<EventKillReward[]> = await rewards.reduce(async (result: any, value) => {
      result = await result;
      const type = EQuest.KillRewardKey[value.reward_kind];
      const reward = (await getItemValue([value.reward]))[0];

      (result[type] ??= []).push({ ...value, reward });
      return result;
    }, Promise.resolve({}));

    return {
      list,
      rawList: rewards
    };
  },
  [EQuest.RewardsCategory.TYPE_4]: async (rewards: QUEST.SealedCharaModsReward[], info: QUEST.SealedChara): Promise<RewardsType["4"]> => {
    const characters = await useSWRAsync("unitList", true, "character");
    const character = characters[info.reward_card_id];
    const TypePrefix: Record<EQuest.SealedCharaModType, string> = { 1: "lv", "2": "skill lv", 3: "awakening" };
    const rewardsObject: Record<EQuest.SealedCharaModType, RewardsType["4"]["list"][0]> = {
      "1": { category: EQuest.SealedCharaModType[1], list: [] },
      "2": { category: EQuest.SealedCharaModType[2], list: [] },
      "3": { category: EQuest.SealedCharaModType[3], list: [] },
    };
    const list = rewards.reduce((result, value) => {
      const v = value.mod_val2 ? `class ${value.mod_val2} (lv ${value.mod_val})` : `${TypePrefix[value.mod_type]} ${value.mod_val}`;
      result[value.mod_type].list.push({
        cost: `${value.cost} / ${value.activate_total_cost}`,
        value: v
      });
      return result;
    }, rewardsObject);
    info.wallet = Url(info.wallet);

    return {
      info,
      character,
      list: Object.values(list),
      rawList: rewards
    };
  },
  [EQuest.RewardsCategory.TYPE_5]: async (rewards: QUEST.BonusPassReward[]): Promise<RewardsType["5"]> => {
    const newRewards = await Promise.all(rewards.map(async (p: any) => {
      return { ...p, rewards: await getItemValue(p.rewards) };
    }));
    const list: [any[], any[]] = newRewards.reduce((result: any, value) => {
      result[value.track === 1 ? 0 : 1].push(value);
      return result;
    }, [[], []]);
    const newList: RewardsType["5"]["list"] = list[0].map((p: any, index) => [p, list[1][index]]);

    return {
      list: newList,
      rawList: rewards
    };
  }
};