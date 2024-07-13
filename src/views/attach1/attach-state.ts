import { attach } from "@/store/attach1";
import { updatePopupMask } from "../components/popupMask";

export const updateAttachDisplay = (openTriggerCallback = true) => {
  updatePopupMask("#attach-info", {
    classNames: ["attach-info-show"],
    openTriggerCallback
  });
};
export const updateShop = () => {
  updatePopupMask(".attach-info-shopItemDetail", {
    classNames: ["shopItemDetail-show"],
    callback: () => {
      attach.updateShop();
    },
  });
};