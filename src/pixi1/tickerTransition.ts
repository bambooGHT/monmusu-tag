import { Ticker } from "pixi.js";

type TransitionFn = (dt: number, stop: () => void) => void;

class TickerTransition {
  private ticker: Ticker;
  constructor() {
    const ticker = Ticker.shared;
    ticker.maxFPS = 75;
    Ticker.shared.autoStart = false;
    this.ticker = ticker;
  }

  add(callback: TransitionFn) {
    const { ticker } = this;

    const remove = () => {
      ticker.remove(start);
    };
    const start = (dt: number) => {
      callback(dt, remove);
    };

    ticker.add(start).start();

    return remove;
  }

  // stop() {
  //   this.ticker.stop();
  // }

  // destroy() {
  // this.ticker.destroy();
  // this.ticker = new Ticker();
  // this.ticker.maxFPS = 75;
  // }
}

const tickerTransition = new TickerTransition();
export default tickerTransition;