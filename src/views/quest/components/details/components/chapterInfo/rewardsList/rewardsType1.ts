import { h } from "vue";
import { rewards1 } from "../../rewardsComponents";
import type { ItemValue } from "@/data";
import type { Quest } from "@/store/quest/types";

export const rewardsType1 = (data: Quest["rewardsList"]["1"]) => {
  const nodes = (item: any, index: any) => {
    const reward = data.rawList[index];
    const nodeArr = [
      h('p', [
        h('span', 'count'),
        h('span', item.count),
      ]),
      h('p', [
        h('span', 'price'),
        h('span', `${reward.price} `),
        h('img', { src: data.icon, alt: 'material' }),
      ]),
      h('p', [
        h('span', 'buy limit'),
        h('span', reward.buylimit || '∞'),
      ])
    ];

    if (reward.startDate) {
      nodeArr.push(h('p', [
        h('span', 'start'),
        h('span', reward.startDate),
      ]));
    }
    if (reward.endDate) {
      nodeArr.push(h('p', [
        h('span', 'end'),
        h('span', reward.endDate),
      ]));
    }

    return nodeArr;
  };
  return [
    h(rewards1, {
      class: 'level-rewards',
      data: data.list,
      isShowText: false,
    },
      {
        default: ({ item, index }: { item: ItemValue, index: number; }) => nodes(item, index)
      }
    )];
};