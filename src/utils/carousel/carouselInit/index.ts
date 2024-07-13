import { DoublyCircularLinkedList } from "@/utils/linkedList";
import type { CarouselNode, El, NodeType, Options, ClassNames, CarouselEls } from "../types";
import { getCarouselEffectClassNamesAndTransitionTime } from "../style/getCarouselEffectStyle";

class DCLLCarouselInit {
  /** 節點 */
  carouselEls: CarouselEls;
  /** 轮播图列表 */
  list: DoublyCircularLinkedList<NodeType>;
  /** 當前節點 */
  currentNode: CarouselNode;
  /** 樣式 */
  classNames: Pick<ClassNames, "center" | "prev" | "next" | "curNav">;
  /** 是否自動播放 */
  isAutoPlay!: boolean;
  loop: boolean;
  slide: boolean;
  /** 过渡时间 */
  transitionTime: number;
  /** 自動播放的時間 */
  autoTime!: number;

  constructor(options: Options) {
    const { el, autoPlay, loop = true, slide = false, carouselEffect } = options;
    const { transitionTime, ...classNames } = getCarouselEffectClassNamesAndTransitionTime(carouselEffect);
    const main = document.querySelector(el.main) as El;
    const listDOM = document.querySelector(el.list) as El;
    const navList = el.nav?.list ? document.querySelector(el.nav.list) : null;
    const toPrev = el.nav?.prev ? document.querySelector(el.nav.prev) as El : null;
    const toNext = el.nav?.next ? document.querySelector(el.nav.next) as El : null;
    const slideList = (<El[]>Object.values(listDOM.children));

    const dcll = new DoublyCircularLinkedList<NodeType>();
    slideList.forEach((p, index) => {
      const nodeObj = { node: p, nav: navList?.children.item(index) as HTMLElement };
      dcll.add(nodeObj);
    });

    main.classList.add(classNames.main);
    listDOM.classList.add(classNames.list);
    navList && navList.classList.add(classNames.nav);
    toPrev && toPrev.classList.add(classNames.toggle, `${classNames.toggle}-prev`);
    toNext && toNext.classList.add(classNames.toggle, `${classNames.toggle}-next`);

    this.list = dcll;
    this.currentNode = dcll.get(0)!;
    this.classNames = {
      center: classNames.center,
      curNav: classNames.curNav,
      prev: classNames.prev,
      next: classNames.next
    };
    this.carouselEls = {
      main,
      listMainNode: listDOM,
      list: slideList,
      navList: navList ? Object.values(navList.children) as El[] : null,
      prev: toPrev,
      next: toNext
    };
    this.loop = loop;
    this.slide = slide;
    this.transitionTime = transitionTime;

    if (autoPlay) {
      this.isAutoPlay = true;
      this.autoTime = transitionTime + (autoPlay?.autoInterval || 2500);
    }
  }
}

export default DCLLCarouselInit;