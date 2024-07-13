import type { RendererElement, RendererNode, VNode } from "vue";
import { rewardsType1 } from "./rewardsType1";
import { rewardsType2 } from "./rewardsType2";
import { rewardsType3 } from "./rewardsType3";
import { rewardsType4 } from "./rewardsType4";
import { rewardsType5 } from "./rewardsType5";

const rewardsComponents: Record<EQuest.RewardsCategory, (data: any) => (VNode<RendererNode> | {
  setup(): () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
  }>;
})[]> = { "1": rewardsType1, "2": rewardsType2, "3": rewardsType3, "4": rewardsType4, "5": rewardsType5 };

export default rewardsComponents;