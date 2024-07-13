import { Graphics, Text, Assets, Sprite, ALPHA_MODES } from "pixi.js";
import type { ILineStyleOptions, ITextStyle } from "pixi.js";
import type { CoordinateTuple, DrawIcon, SizeTuple } from "./types";

class GraphicsCreator {
  /** 绘制圆圈 */
  static circle(options: ILineStyleOptions, size: number, coordinate: CoordinateTuple) {
    const circle = new Graphics();
    circle.beginFill(0xffffff, 0.5)
      .lineStyle(options)
      .drawCircle(0, 0, size)
      .endFill();

    circle.position.set(...coordinate);
    circle.eventMode = "static";
    circle.cursor = 'pointer';

    return circle;
  };
  /** 绘制召唤点图标 */
  static async summonPoint(src: string, sizeRatio: SizeTuple, coordinate: CoordinateTuple) {
    if (!Assets.resolver.hasKey(src)) {
      Assets.add({ src, alias: src, data: { alphaMode: ALPHA_MODES.NPM } });
    }
    const texture = await Assets.load(src);
    const icon = Sprite.from(texture);

    icon.width = icon.width * sizeRatio[0];
    icon.height = icon.height * sizeRatio[1];
    icon.alpha = 0.7;
    icon.eventMode = "static";
    icon.cursor = 'pointer';
    icon.anchor.set(0.5);
    icon.position.set(coordinate[0], coordinate[1]);
    return icon;
  };

  static async preLoadIcon(src: string) {
    if (!Assets.resolver.hasKey(src)) {
      Assets.add({ src, alias: src, data: { alphaMode: ALPHA_MODES.NPM } });
      await Assets.load(src);
    }
  }

  static async icon(params: DrawIcon) {
    const { src, sizeRatio, coordinate, blendMode } = params;
    if (!Assets.resolver.hasKey(params.src)) {
      Assets.add({ src, alias: src, data: { alphaMode: ALPHA_MODES.NPM } });
    }

    const texture = await Assets.load(src);
    const icon = Sprite.from(texture);

    if (sizeRatio) {
      icon.width *= sizeRatio[0];
      icon.height *= sizeRatio[1];
    }
    icon.anchor.set(0.5);
    blendMode && (icon.blendMode = blendMode);
    coordinate && icon.position.set(coordinate.x, coordinate.y);

    return icon;
  };
  /** 绘制正方形 */
  static square(size: number, color: number, coordinate: CoordinateTuple) {
    const square = new Graphics();
    square.eventMode = "none";
    square.beginFill(0xffffff, 1)
      .lineStyle(4, color)
      .drawRect(0, 0, size, size);

    size /= 2;
    square.pivot.set(size);
    square.position.set(coordinate[0] - size, coordinate[1] - size);

    return square;
  }
  /** 绘制文本 */
  static text(value: string | number, options: Partial<ITextStyle>, coordinate: CoordinateTuple) {
    const text = new Text(value, options);
    text.eventMode = "none";
    text.anchor.set(0.5);
    text.position.set(...coordinate);

    return text;
  }
};

export default GraphicsCreator;