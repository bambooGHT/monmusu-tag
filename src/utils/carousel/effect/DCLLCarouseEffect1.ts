import type { CarouselNode, El, NodeType } from "../types";
import DCLLCarouseEffectAbs from "./DCLLCarouseEffectAbs";

class DCLLCarouseEffect1 extends DCLLCarouseEffectAbs {
  protected toIndexNavEventInit(): void {
    const { carouselData } = this;;
    const navList = carouselData.carouselEls.navList;
    if (!navList) return;

    const { list } = carouselData;
    [...list].forEach((p, index) => {
      p.data.nav!.onclick = this.throttle(() => {
        const { currentNode } = carouselData;
        if (currentNode.data === p.data) return;

        const indexDiffValue = (currentNode.next.data === p.data || currentNode.prev.data === p.data) ? undefined : list.indexOf(currentNode.data) - index;
        this.toIndex(p, indexDiffValue);
      });
    });
  }

  toPrev(): void {
    const { carouselData } = this;;
    const NodeData = carouselData.currentNode;
    if (!carouselData.loop && NodeData.data === carouselData.list.getHead()) {
      return;
    }
    this.toIndex(NodeData.prev);

  }

  toNext(): void {
    const { carouselData } = this;;
    const NodeData = carouselData.currentNode;
    if (!carouselData.loop && NodeData.data === carouselData.list.getTail()) {
      return;
    }
    this.toIndex(NodeData.next);
  }

  protected toIndex(node: CarouselNode, indexDiffValue?: number): void {
    const { carouselData } = this;;
    if (indexDiffValue) this.toIndexBefore(node, indexDiffValue);
    this.toggleStyle(carouselData.currentNode, false);
    this.toggleStyle(node, true);
    carouselData.currentNode = node;
  }

  protected autoPlayStart(): void {
    const { carouselData } = this;
    if (document.contains(carouselData.carouselEls.main)) this.autoTimer = setTimeout(() => {
      if (document.visibilityState === 'visible') {
        this.toIndex(carouselData.currentNode.next);
      }
      this.autoPlayStart();
    }, carouselData.autoTime);
  }

  protected autoPlayStop(): void {
    clearTimeout(this.autoTimer);
    this.autoTimer = 0;
  }

  protected swipeStart = (e: PointerEvent): void => {
    this.swipeStartBefore(e);

    let offsetX = 0;
    const { carouselEls, currentNode, list, loop } = this.carouselData;
    const { data, prev, next } = currentNode;
    const [head, tail] = [list.getHead(), list.getTail()];
    const mainWidth = carouselEls.listMainNode.clientWidth;

    const { x } = e;
    const setTransform = (data: NodeType, value: string | number) => data.node.style.transform = `translateX(${value}px)`;
    const setOpacity = (data: NodeType, value: number) => data.node.style.opacity = "" + value;
    const toIndex = () => this[offsetX > 0 ? "toPrev" : "toNext"]();

    document.onpointermove = (e) => {
      offsetX = e.x - x;
      const opacity = Math.abs(offsetX) / mainWidth;

      setTransform(data, offsetX);
      setOpacity(data, 1 - opacity);

      if (!(!loop && data === head)) {
        setTransform(prev.data, `-${mainWidth - offsetX}`);
        (next.data === head && offsetX < 0) || setOpacity(prev.data, opacity);
      };

      if (!(!loop && data === tail)) {
        setTransform(next.data, mainWidth + offsetX);
        (prev.data === tail && offsetX > 0) || setOpacity(next.data, opacity);
      };

      if (Math.abs(offsetX) >= mainWidth) {
        this.swipeEnd();
        toIndex();
      }
    };

    document.onpointerup = () => {
      this.swipeEnd();
      if (Math.abs(offsetX) > mainWidth * 0.45) {
        toIndex();
      }
    };
  };

  private toIndexBefore(node: CarouselNode, indexDiffValue: number) {
    const { carouselData: { carouselEls, classNames, currentNode, transitionTime } } = this;
    const posCLass = indexDiffValue > 1 ? [classNames.prev, classNames.next] : [classNames.next, classNames.prev];
    const nextNode = node.data.node;

    nextNode.style.transition = "0s";
    nextNode.classList.toggle(posCLass[0]);
    //触发一次重绘
    carouselEls.main.offsetWidth;
    nextNode.style.cssText = "";

    nextNode.classList.toggle(posCLass[0]);
    currentNode.data.node.classList.toggle(posCLass[1]);
    setTimeout(() => {
      currentNode.data.node.classList.toggle(posCLass[1]);
    }, transitionTime - 10);
  }

  private toggleStyle(node: CarouselNode, is: boolean) {
    const { classNames } = this.carouselData;
    node.data.node.classList.toggle(classNames.center, is);
    node.prev.data.node.classList.toggle(classNames.prev, is);
    node.next.data.node.classList.toggle(classNames.next, is);
    node.data.nav?.classList.toggle(classNames.curNav, is);
  }
}

export default DCLLCarouseEffect1;