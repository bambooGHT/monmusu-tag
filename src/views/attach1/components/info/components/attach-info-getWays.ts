import router from "@/router";
import { Url } from "@/service";
import { attach } from "@/store/attach1";
import { updateShop } from "@/views/attach1/attach-state";
import propComponent from "@/views/components/propComponent";
import { computed, h } from "vue";

export const attachGetWays = () => {
  const currentAttachGetWays = computed(() => {
    if (attach.currentAttach) {
      return attach.attachGetWays[attach.currentAttach.id];
    }
  });
  const toLevel = (value: DATA.AttachObtainWayInfo) => {
    router.push("quest", value.chapterId, { levelId: value.levelId! });
  };
  const imgLoadError = (e: ErrorEvent) => {
    (e.target as HTMLImageElement).style.display = "none";
  };
  const getWayList = Object.entries(currentAttachGetWays.value || {}).map(([key, item]) => {
    const title = h("div", `- ${key}`);
    let list;

    if (Array.isArray(item)) {
      const isShop = key === "shop";
      list = item.map(p => {
        const title = h("p", { class: (p.chapterId || isShop) && "click" }, p.title);
        const img = p.imgSrc && h("img", {
          decoding: "async",
          loading: "lazy",
          src: Url(p.imgSrc),
          class: isShop ? "shop" : undefined,
          onError: imgLoadError
        });

        let fn;
        if (isShop) {
          fn = () => {
            updateShop();
            attach.updateShop(p.shopId!);
          };
        } else if (p.chapterId) {
          fn = () => toLevel(p);
        }
        const elements = img ? [img, title] : [title];
        return h("li", {
          onclick: fn
        }, elements);
      });
    } else {
      const needMaterials = item.materials.reduce((result: ObjIndex, value) => {
        const title = value.rarity ? value.rarity : attach.list.find(p => p.id === value.id)!.name;
        result[title] = ~~result[title] + 1;
        return result;
      }, {});

      const props = h(propComponent, {
        key: item.itemInfo.iconId,
        id: item.itemInfo.iconId,
        iconKey: item.itemInfo.iconKey,
        rarity: item.itemInfo.rarity,
      }, {
        default: () => item.itemInfo.name
      });

      const needMaterialsInfo = h("div", { class: "materials" },
        Object.entries(needMaterials).map(([key, value]) => {
          return h("p", [h("span", key), h("span", ` * ${value}`)]);
        }));
      list = h("li", [props, needMaterialsInfo]);
    }

    const ul = h("ul", { class: "attach-info-getWays-list" }, list);
    return h("li", [title, ul]);
  });

  return h("ul",
    { class: "attach-info-getWays" },
    getWayList
  );
};