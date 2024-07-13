import { throttle2 } from "@/utils/throttle";
import type DCLLCarouselInit from "../carouselInit";
import type { CarouselNode } from "../types";

abstract class DCLLCarouseEffectAbs {
  /** 定時器 */
  autoTimer: number = 0;
  /** 节流函数 */
  throttle: ReturnType<typeof throttle2>;
  constructor(protected carouselData: DCLLCarouselInit) {
    const { carouselEls, transitionTime, slide, isAutoPlay } = carouselData;
    const thr = throttle2(transitionTime);
    this.throttle = thr;
    // 注册事件
    if (carouselEls.next) {
      carouselEls.prev!.onclick = thr(() => {
        this.toPrev();
      });
      carouselEls.next.onclick = thr(() => {
        this.toNext();
      });
    }
    if (slide) {
      carouselEls.listMainNode.onpointerdown = thr((e) => {
        this.swipeStart(e);
      });
    }
    if (isAutoPlay) this.autoPlayStart();

    carouselEls.main.onpointerdown = () => {
      this.autoPlayStop();
    };
    carouselEls.main.onpointerup = () => {
      if (isAutoPlay) this.autoPlayStart();
    };

    this.toIndex(carouselData.currentNode);
    this.toIndexNavEventInit();
  }
  /** 导航列表切换事件初始化 */
  protected abstract toIndexNavEventInit(): void;
  /** 上一张 */
  abstract toPrev(): void;
  /** 下一张 */
  abstract toNext(): void;

  protected abstract toIndex(node: CarouselNode, index?: number): void;

  protected abstract autoPlayStart(): void;

  protected abstract autoPlayStop(): void;
  /** 滑动开始 */
  protected abstract swipeStart(e: PointerEvent): void;
  /** 滑动开始前 */
  protected swipeStartBefore = (e: PointerEvent): void => {
    e.preventDefault();
    DCLLCarouseEffectAbs.disableTransition(this.carouselData.currentNode);
  };
  /** 滑动结束 */
  protected swipeEnd(): void {
    document.onpointermove = null;
    document.onpointerup = null;
    DCLLCarouseEffectAbs.enableTransition(this.carouselData.currentNode);
  };

  static disableTransition(currentNode: CarouselNode) {
    const { data, next, prev } = currentNode;
    [data, next.data, prev.data].forEach(p => {
      p.node.style.transition = "0s";
    });
  };

  static enableTransition(currentNode: CarouselNode) {
    const { data, next, prev } = currentNode;
    [data, next.data, prev.data].forEach(p => {
      p.node.style.cssText = "";
    });
  };
}

export default DCLLCarouseEffectAbs;