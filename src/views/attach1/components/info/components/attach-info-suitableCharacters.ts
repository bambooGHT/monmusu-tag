import { attach } from "@/store/attach1";
import unitFace from "@/views/components/unitFace";
import { h } from "vue";

export const suitableCharacters = () => {
  const { suitableCharacters } = attach;
  const size = h("p",
    { class: "family-Orbitron" },
    `size: ${suitableCharacters.length ? suitableCharacters.length : "ALL"}`
  );
  const list = h("ul", { class: "family-Meiryo" },
    suitableCharacters.map(p => {
      const unit = h(unitFace, {
        id: p.id,
        attr: p.element,
        job: p.classId,
        rarity: p.rarityId,
        resource: p.resource
      }, {
        default: () => [h("p", `【${p.nickname || 'なし'}】`), h("p", p.charaName)]
      });
      return h("li", {
        key: p.id,
        title: p.text || p.charaName
      }, unit);
    }
    ));

  return h("section", { class: "attach-info-suitableCharacters" }, [size, list]);
};