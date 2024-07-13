import unitFace from '@/views/components/unitFace';
import { h } from "vue";
import type { Quest } from "@/store/quest/types";
import "./rewardsType2.scss";
import propComponent from '@/views/components/propComponent';

export const rewardsType2 = (data: Quest["rewardsList"]["2"]) => {
  const nodes = data.list.map((p) => {
    const childNodes = [
      h('span', '★'),
      `*${p.star_count} ${p.list_text}`,
    ];
    if (p.reward) {
      childNodes.unshift(h(propComponent, { ...p.reward, seat: "right" }));
    }
    return h('p', childNodes);
  });

  const { character } = data;
  if (character) {
    nodes.unshift(h(unitFace, {
      style: { marginLeft: 0 },
      id: character.id,
      resource: character.resource,
      attr: character.element,
      rarity: character.rarityId,
      job: character.classId,
    }));
  }
  return [h("section", { class: "reward-2" }, nodes)];
};