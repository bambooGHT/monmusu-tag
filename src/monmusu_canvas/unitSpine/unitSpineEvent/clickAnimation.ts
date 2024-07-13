import type { IAnimation, ITimeline } from "pixi-spine";
import { throttle } from "@/utils/throttle";
import SpineEvent from './spineEvent';

export class ClickAnimation extends SpineEvent {
  open(): void {
    const { spine } = this;
    const animas = [...spine.skeleton.data.animations];
    // 只有1个的场合不绑定事件
    if (animas.length === 1) return;

    spine.onpointertap = throttle(this.#getRandomAT(animas), 300);
  }

  closure(): void {
    const spine = this.spine;
    if (spine) {
      spine.onpointertap = null;
    }
    super.closure();
  }
  // 随机动画
  #getRandomAT(animations: IAnimation<ITimeline>[]) {
    let index = -1;

    return () => {
      if (index === -1) {
        index = animations.length - 1;
        this.#shuffleArray(animations);
      }

      const { spine, config } = this;
      const randomIndex = ~~(Math.random() * index);
      const anima = animations[randomIndex];

      spine.state.setAnimation(0, anima.name, config.events.repeatAnimation);
      //已选取的跟index交换
      this.#posExchange(animations, index, randomIndex);
      index--;
    };
  }
  // 洗切数组
  #shuffleArray(animations: IAnimation<ITimeline>[]) {
    if (animations.length < 2) return;

    for (let i = animations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.#posExchange(animations, i, j);
    }
  }

  #posExchange(list: IAnimation<ITimeline>[], p1: number, p2: number) {
    [list[p1], list[p2]] = [list[p2], list[p1]];
  }
}