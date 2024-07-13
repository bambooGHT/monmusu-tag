import router from "@/router";
import { reactive } from "vue";

type Popup = {
  classNames?: string[];
  callback?: Function;
  openTriggerCallback?: boolean;
  /** `default:true` */
  mask?: boolean;
  state?: boolean;
  zIndexTransition?: boolean;
};

class PopupMask {
  #baseZIndex: number = 9000;
  #popups: (Popup & { id: string, el: HTMLElement; })[] = [];
  updatePopup(id: string, options: Popup = {}) {
    const { openTriggerCallback, callback, classNames, mask, state = true, zIndexTransition = true } = options;
    const popups = this.#popups;
    const popup = popups[popups.length - 1];
    if (popup?.id === id) {
      this.clearPopup();
      return;
    }
    if (!state) {
      this.#hide();
      return;
    }
    const dom = document.querySelector(id) as HTMLElement;
    const isTran = dom.classList.contains("popup-tran-hide");
    const func = () => {
      classNames && classNames.forEach(p => dom.classList.toggle(p));
      isTran && dom.classList.toggle("popup-tran-show");
      dom.style.zIndex = ``;
    };

    func();
    openTriggerCallback && callback?.();
    this.#display(mask);
    popups.push({
      id, el: dom, mask, zIndexTransition, callback: () => {
        callback?.();
        func();
      }
    });
    this.#setZindex(dom);
    this.#setZIndexTransition(popups.length > 1 ? false : zIndexTransition);
  }
  clearPopup() {
    const popups = this.#popups;
    const popup = popups[popups.length - 1];
    popups.pop()!.callback!();

    const len = popups.length;
    this.#setZIndexTransition(len ? false : popup.zIndexTransition! ?? true);
    if (!len) {
      this.#hide();
      return;
    }
    this.#setZindex(popups[len - 1].el);
  }

  clearAll() {
    const len = this.#popups.length;
    for (let i = 0; i < len; i++) {
      this.clearPopup();
    }
  }

  #display(mask: boolean = true) {
    state.mask = mask;
    state.show = true;
  }
  #hide() {
    state.style.zIndex = 100;
    state.show = false;
    state.mask = false;
  }
  #setZindex(dom: HTMLElement) {
    const zIndex = this.#baseZIndex + this.#popups.length;
    state.style.zIndex = zIndex;
    dom.style.zIndex = `${zIndex + 1}`;
  }
  #setZIndexTransition(tran: boolean) {
    state.style.transition = tran ? `.3s ease` : `.3s ease, z-index 0s`;
  }
}

export const state = reactive({
  show: false,
  mask: false,
  style: {
    zIndex: 100,
    transition: `.3s ease, z-index 0s`
  }
});

export const popupMask = new PopupMask();
/**
 * @param id 元素id
 * @param classNames 要添加的类名 
 * @param callBack 回调函数
 */
export const updatePopupMask = (id: string, options?: Popup) => {
  popupMask.updatePopup(id, options);
};

router.addBeforeEach(() => {
  popupMask.clearAll();
});