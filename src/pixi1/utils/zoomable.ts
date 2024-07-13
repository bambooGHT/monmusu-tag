import type { Container, FederatedPointerEvent } from "pixi.js";
import { clamp } from ".";


type ZoomableOptions = {
  size?: { width: number, height: number; };
  move: boolean;
};

export class Zoomable {
  private removeListeners: () => void = () => { };
  size: [number, number];
  /**
   * @param target - The target container to be made zoomable.
   * @param options - Optional configuration options for zooming.
   * @param {boolean} [options.size] - Defaults to the target container size
   * @param {boolean} [options.move] - Default to true
   */
  constructor(private target: Container, options?: ZoomableOptions) {
    let { size, move = true } = options || {};

    const { width: rawW, height: rawH } = size || { width: target.width, height: target.height };
    const [w, h] = this.size = [rawW / 2, rawH / 2];

    target.pivot.set(w, h);
    target.position.set(w, h);

    if (move) {
      this.init();
    }
  }

  private init() {
    const onPointerDown = (e: FederatedPointerEvent) => {
      if (e.target !== this.target || this.target.scale.x === 1) return;

      e.stopPropagation();
      this.startMove(e.originalEvent as FederatedPointerEvent);
    };

    this.target.addEventListener("pointerdown", onPointerDown);
    this.removeListeners = () => {
      this.target.removeEventListener("pointerdown", onPointerDown);
    };
  }

  private startMove(originalEvent: FederatedPointerEvent) {
    let x, y, { screenX, screenY } = originalEvent;

    const target = this.target;
    const { maxX, maxY, minX, minY } = this.calculateBounds(target.scale.x);

    const onPointerMove = () => {
      x = (originalEvent.screenX - screenX) * 0.75;
      y = (originalEvent.screenY - screenY) * 0.75;

      target.x = clamp(target.x + x, minX, maxX);
      target.y = clamp(target.y + y, minY, maxY);
      screenX = originalEvent.screenX;
      screenY = originalEvent.screenY;
    };

    const stopMove = () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', stopMove);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopMove);
  }

  updateScale(value: number) {
    const scaleValue = 1 + value / 100;
    const { maxX, maxY, minX, minY } = this.calculateBounds(scaleValue);
    this.target.x = clamp(this.target.x, minX, maxX);
    this.target.y = clamp(this.target.y, minY, maxY);
    this.target.scale.set(scaleValue);
  }

  clear() {
    this.updateScale(0);
    this.removeListeners();
  }

  private calculateBounds(scaleValue: number) {
    const [width, height] = this.size,
      maxX = width * scaleValue,
      maxY = height * scaleValue,
      minX = width - (maxX - width),
      minY = height - (maxY - height);

    return { maxX, maxY, minX, minY };
  }
}