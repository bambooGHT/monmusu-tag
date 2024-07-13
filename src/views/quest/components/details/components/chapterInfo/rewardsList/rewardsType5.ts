import type { Quest } from "@/store/quest/types";
import type { ItemValue } from "@/data";
import propComponent from "@/views/components/propComponent";
import { showPropInfo } from "@/views/components/propInfoPopup";
import { h, type VNode } from "vue";
import "./rewardsType5.scss";

export const rewardsType5 = (data: Quest["rewardsList"]["5"]) => {
  const rewardComponent = (rewards: ItemValue[]) => {
    return rewards.map((p) => h("li", [
      h(propComponent, {
        title: p.name,
        key: p.id,
        class: 'icon',
        id: p.id,
        iconKey: p.iconKey,
        rarity: p.rarity,
        onClick: () => {
          showPropInfo(p);
        }
      }),
      h("p", `* ${p.count}`)
    ])
    );
  };

  const list = data.list.reduce((result: VNode[], [reward, premium]) => {
    const li = h("li", [
      h("div", reward.box_message),
      h("ul", { class: "reward-list" }, rewardComponent(reward.rewards)),
      h("ul", { class: "reward-list" }, rewardComponent(premium.rewards)),
    ]);
    result.push(li);
    return result;
  }, []);

  list.unshift(h("li", [
    h("div", ""),
    h("div", { class: "title1" }, "reward"),
    h("div", { class: "title1" }, "premium")
  ]));
  
  return [h("ul", { class: "reward-5", }, list)];
};