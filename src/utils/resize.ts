export default class Resize {
  #resize!: ResizeObserver;
  constructor(e: HTMLElement, Callback: (resizeObserverEntry: ResizeObserverEntry) => void) {
    this.#resize = new ResizeObserver((entries) => {
      Callback(entries[0]);
    });
    this.#resize.observe(e);
  }

  remove() {
    this.#resize.disconnect();
  }
}