import { attach } from "@/store/attach1";
import unitFace from "@/views/components/unitFace";
import { h, reactive } from "vue";
import { attachGetWays, suitableCharacters, shopItemDetail } from "./components";
import "./attach-info.scss";
import tabs from "@/views/components/tabs";

export const attachInfo = {
  setup() {
    const comp = { getWays: attachGetWays, suitableCharacters: suitableCharacters };
    const currentTab = reactive<{ value: keyof typeof comp; }>({ value: "getWays" });

    return () => [
      h("article",
        { id: "attach-info", class: "attach-info", },
        [
          attachInfoTop(),
          h(tabs, {
            list: Object.keys(comp),
            index: currentTab.value,
            "onUpdate:index": (value: any) => {
              currentTab.value = value;
            }
          }),
          comp[currentTab.value](),
        ]
      ),
      h(shopItemDetail)
    ];
  }
};

const attachInfoTop = () => {
  const { currentAttach, attachAssocTokens } = attach;
  const attachInfoText = h("div",
    { class: "attach-info-text" },
    [h("p", currentAttach?.name), h("p", currentAttach?.text)]);
  const assocTokens = attachAssocTokens?.[0] &&
    h("ul", { class: "attach-info-assoc-tokens" }, attachAssocTokens.map(({ id, unit }) => {
      const token = h(unitFace, {
        id: id,
        resource: unit.resource,
        attr: unit.element,
        rarity: unit.rarityId,
        job: unit.classId,
        category: "token",
      }, {
        default: () => h("p", unit.text || unit.charaName)
      });
      return h("li", {
        title: unit.text || unit.charaName,
        key: id,
      }, token);
    }));;
  const elements = assocTokens ? [assocTokens, attachInfoText] : [attachInfoText];

  return h("div", { class: "attach-info-top" }, elements);
};