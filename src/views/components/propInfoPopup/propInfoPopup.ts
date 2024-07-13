import type { PropsData } from "../propComponent/types";
import { ref } from "vue";
import { useSWRAsync } from "@/service";
import { updatePopupMask } from "../popupMask";

type Info = {
  name: string;
  text?: string;
  unit?: { category: UNIT.UnitType, id: number; };
};
type Props = PropsData & Info;

export const props = ref<Props & { unitValue: UNIT.Character | UNIT.BeastGod; }>();
export const showPropInfo = async (propsData: Props) => {
  props.value = propsData as any;
  if (propsData.unit) {
    const characters = await useSWRAsync("unitList", true, propsData.unit.category);
    props.value!.unitValue = characters[propsData.unit.id] as any;
  }
  updateShowPropInfo();
};

export const updateShowPropInfo = () => {
  updatePopupMask(".prop-info-box", {
    classNames: ["show-prop"]
  });
};