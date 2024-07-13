import type { Quest } from "@/store/quest/types";
import unitFace from '@/views/components/unitFace';
import { h } from "vue";
import "./rewardsType4.scss";

export const rewardsType4 = (data: Quest["rewardsList"]["4"]) => {
  const { character } = data;
  const list = data.list.map((value) => {
    const sublist = value.list.reduce((result, item) => {
      result.push(h("li", [
        h('img', { src: data.info.wallet, alt: 'material' }),
        h("div", `* ${item.cost}`),
        h("div", item.value)
      ]));
      
      return result;
    }, [h("li", value.category)]);

    return h("ul", { class: "sublist" }, sublist);
  });

  const unit = h(unitFace, {
    style: { marginLeft: 0 },
    id: character.id,
    resource: character.resource,
    attr: character.element,
    rarity: character.rarityId,
    job: character.classId
  }, { default: () => [h("p", `【${character.nickname}】`), h("p", character.charaName)] });
  const { rank1_pt, rank2_pt, rank3_pt } = data.info;
  const rankValue = [rank1_pt, rank2_pt, rank3_pt].map((p, index) => {
    return h("li", [
      h('span', {
        style: {
          color: 'rgb(235, 199, 0)',
          lineHeight: '2.2rem',
          fontSize: '2rem',
          marginTop: '0.2rem',
        },
      }, "★ "), ` *${index + 1} = ${p}`, h('img', { src: data.info.wallet, alt: 'material' })]);
  });

  return [h("section",
    { class: "reward-4" },
    [unit,
      h("ul", { class: "rank" }, rankValue),
      h("ul", { class: "list" }, list)])
  ];
};