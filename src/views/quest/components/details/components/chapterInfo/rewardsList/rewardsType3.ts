import propComponent from '@/views/components/propComponent';
import tabs from '@/views/components/tabs';
import { rewards2 } from '../../rewardsComponents';
import { h, ref } from "vue";
import type { ItemValue } from "@/data";
import type { Quest } from "@/store/quest/types";

export const rewardsType3 = (data: Quest["rewardsList"]["3"]) => {
  const index = ref(EQuest.KillRewardKey[0]);

  const nodeTabs = {
    setup() {
      return () => h(tabs, {
        list: Object.values(EQuest.KillRewardKey).filter(p => isString(p)) as string[],
        index: index.value,
        "onUpdate:index": (value: string) => {
          index.value = value;
        }
      });
    }
  };

  const nodeList = {
    setup() {
      return () => h(rewards2, {
        data: data.list[index.value],
      },
        {
          default: ({ item }: { item: QUEST.EventKillReward & { reward: ItemValue; }; }) => [
            h('p', `target num *${item.target_num}`),
            ...[item.reward].map((p) =>
              h('div', [
                h(propComponent, {
                  key: p.id,
                  class: 'icon',
                  id: p.id,
                  iconKey: p.iconKey,
                  rarity: p.rarity,
                  text: p.text,
                  seat: 'right',
                }),
                h('p', ` ${p.name} *${p.count}`),
              ])
            ),
          ],
        }
      );
    }
  };
  return [
    nodeTabs,
    nodeList,
  ];
};