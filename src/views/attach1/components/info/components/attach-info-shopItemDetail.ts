import { getIcon } from "@/data";
import { Url } from "@/service";
import { attach } from "@/store/attach1";
import { updateShop } from "@/views/attach1/attach-state";
import propComponent from "@/views/components/propComponent";
import { h } from "vue";

export const shopItemDetail = {
  setup() {
    return () => h("section",
      {
        class: "attach-info-shopItemDetail",
        style: {
          display: attach.currentShopItem ? "block" : "none"
        }
      },
      attach.currentShopItem && [
        h("div", { class: "attach-info-shopItemDetail-info" }, itemInfo()),
        h("div", {
          class: "shopItemDetail-closure",
          onClick: () => updateShop()
        }, "✖")
      ]);
  }
};

const itemInfo = () => {
  const { commodity, items } = attach.currentShopItem!;
  const list = h("ul",
    { class: "attach-info-shopItemDetail-items" },
    items.flatMap(item => {
      const prop = h(propComponent, {
        id: item.id,
        iconKey: item.iconKey,
        rarity: item.rarity,
        text: item.text,
        seat: "right"
      });
      return h("li", [prop, h("p", `${item.name} *${item.count}`)]);
    })
  );
  const itemInfo = [
    h("P", { class: "text-center" }, "shopItemDetail"),
    h("P", [h("span", "name: "), commodity.name]),
    h("p", [h("span", "text: "), commodity.text]),
    h("p", [h("span", "price: "), commodity.price,
    commodity.price_name.includes('payment') ?
      h("span", " JPY") : h("img", {
        src: Url(getIcon.wallet(commodity.price_name)),
        alt: commodity.price_name
      })]),
    h("p", [h("span", "buylimit: "), commodity.buylimit])
  ];
  commodity.startDate && itemInfo.push(
    h("p", [h("span", "start: "), h("time", { datetime: commodity.startDate }, commodity.startDate)]),
    h("p", [h("span", "end: "), h("time", { datetime: commodity.endDate }, commodity.endDate)]),
  );
  itemInfo.push(
    h("P", { class: "text-center" }, "items"),
    list!,
  );

  return itemInfo;
};