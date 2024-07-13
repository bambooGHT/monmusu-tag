import { useSWR } from "@/service";
import { throttle } from "@/utils/throttle";
import { onUpdated } from "vue";
import { updatePopupMask } from "../components/popupMask";
import { updatePageMeta } from "@/router/title";

const gallery = () => {
  let isEnlarge = false;
  const galleryList = useSWR("gallery");

  const enlarge = (el: HTMLElement) => {
    const clientWidth = document.documentElement.clientWidth,
      clientHeight = document.documentElement.clientHeight,
      offsetTop = el.offsetTop,
      height = el.offsetHeight,
      { naturalWidth, naturalHeight } = (<HTMLImageElement>el.childNodes[1]);

    if ((<HTMLImageElement>el.childNodes[1]).offsetHeight > clientHeight / 2 && clientWidth * (naturalHeight / naturalWidth) > clientHeight) {
      const newWidth = clientHeight * (naturalWidth / naturalHeight);
      const browserWidth = Math.min(clientWidth, +getComputedStyle(document.documentElement).getPropertyValue('--max-width').split("px")[0]);
      const marginLeft = (browserWidth - newWidth) / 2;

      el.style.width = `${newWidth}px`;
      el.style.marginLeft = `calc(-100% + ${marginLeft}px - 1rem)`;
    }

    if (el.dataset.pos === "right") {
      el.classList.toggle("enlarge-right");
    }

    el.classList.toggle("enlarge");
    el.classList.toggle("enlarge-overflow", true);

    if (isEnlarge) {
      const top = (clientHeight - height) / 2 + document.documentElement.scrollTop - offsetTop;
      const imgViewWidth = clientWidth * (naturalWidth / naturalHeight);
      const isRotate = naturalWidth > naturalHeight && imgViewWidth < clientHeight;
      let transformStyle = `translateY(${top}px)`;

      if (isRotate) {
        const translateX = (document.documentElement.clientWidth - imgViewWidth) / 2;
        el.style.width = `${imgViewWidth}px`;
        transformStyle += ` translateX(${translateX}px) rotate(90deg)`;
      }

      el.style.transform = transformStyle;
      return;
    }
    el.style.cssText = ``;
  };

  const enlargeRemoveOverflow = (el: HTMLElement) => {
    if (!isEnlarge) {
      el.classList.toggle("enlarge-overflow", false);
    }
  };

  const enlargeToggle = throttle((el: HTMLElement) => {
    updatePopupMask("#gallery", {
      callback: () => {
        isEnlarge = !isEnlarge;
        enlarge(el);
      },
      openTriggerCallback: true
    });
  }, 400);

  const toAnchorPos = (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    e.preventDefault();
    toScroll(target);
  };

  const toScroll = (target: HTMLAnchorElement) => {
    updatePageMeta(`gallery - ` + target.id);
    window.scrollTo(0, target.offsetTop - 50);
    history.replaceState(history.state, "", target.href);
  };

  onUpdated(() => {
    if (window.location.hash) {
      const dom = document.querySelector(decodeURIComponent(window.location.hash)) as HTMLAnchorElement;
      dom && toScroll(dom);
    }
  });

  return { galleryList, enlarge, enlargeRemoveOverflow, enlargeToggle, toAnchorPos };
};

export default gallery;;