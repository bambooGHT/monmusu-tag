import { Container, Graphics, Text } from "pixi.js";
import type { PathStyle } from "../../config";
import CalcTools from "../../utils/calcTools";
import PixiApp from "@/pixi1/pixiApp";
import type { CoordinateObject, CoordinateTuple } from "../../utils/types";
import GraphicsCreator from "../../utils/graphicsCreator";
import tickerTransition from "@/pixi1/tickerTransition";
import type { MapDrawable, PointData } from "../mapEntityTypes";

enum PathDrawSpeed {
  MIN = 2,
  SPEED = 20 / 60,
  MAX = 50
};

export class MapRoutePath implements MapDrawable {
  view = new Container();
  constructor(private route: LevelMap.Route, private style: PathStyle, private FPS: number) { }

  draw() {
    const { view, route, FPS } = this;
    const points = route.points;

    if (points.length === 1) return;

    let drawing = false;
    let cdis = 0;
    let cSpeed = PathDrawSpeed.MIN;
    let cPoint: PointData;
    let pathElList: (Graphics | Text)[] = [];
    let removeFunc = () => { };

    const reset = () => {
      PixiApp.destroy(pathElList);

      cdis = 0;
      cSpeed = PathDrawSpeed.MIN;
      pathElList = [];
      cPoint = undefined as any;
    };

    this.destroy = () => {
      drawing = false;
      removeFunc();
      reset();
    };

    const draw = () => {
      if (drawing) return;
      if (pathElList.length) {
        reset();
        return;
      };

      drawing = true;
      cPoint = CalcTools.nextPointDistance(points);

      const { pathGraphics, func: drawPathFunc } = this.#drawPath();
      pathElList.push(pathGraphics);
      view.addChild(pathGraphics);

      const drawText = () => {
        const { currentPoint } = cPoint;
        if (currentPoint.wait) {
          const coordinate: CoordinateTuple = [currentPoint.x, currentPoint.y];
          const time = String(currentPoint.wait / FPS).split(".");
          const waitTime = Number(`${time[0]}${time[1] ? `.${time[1].slice(0, 2)}` : ""}`);

          const el = this.#drawWaitText(`${route.id}-${waitTime}s`, coordinate);
          pathElList.push(...el);
          view.addChild(...el);
        }
      };

      drawText();
      removeFunc = tickerTransition.add((dt, remove) => {
        if (cdis >= cPoint.distance) {
          if (!cPoint.next) {
            drawing = false;
            remove();
            return;
          }

          cdis = 0;
          cPoint = cPoint.next();
          drawText();
        }

        if (cSpeed < PathDrawSpeed.MAX) cSpeed += PathDrawSpeed.SPEED;

        const dc = (cdis += (dt * cSpeed)) / cPoint.distance;
        const { currentPoint, deltaCoordinates } = cPoint;
        const x = currentPoint.x + dc * deltaCoordinates.x;
        const y = currentPoint.y + dc * deltaCoordinates.y;

        drawPathFunc({ x, y }, cPoint.currentIndex);
      });
    };

    draw();
    this.draw = draw;
  }

  #drawPath() {
    const pathGraphics = new Graphics();
    const { style, route } = this;
    const points = route.points;
    const startLocation = { x: points[0].x, y: points[0].y };

    return {
      pathGraphics,
      func: (endPos: CoordinateObject, currenPointLen: number) => {
        pathGraphics.clear()
          .lineStyle(style.options)
          .moveTo(startLocation.x, startLocation.y);

        for (let i = 0; i < currenPointLen; i++) {
          pathGraphics.lineTo(points[i].x, points[i].y);
        }
        pathGraphics.lineTo(endPos.x, endPos.y);
      }
    };
  };

  #drawWaitText(textValue: string, coordinate: CoordinateTuple) {
    const { style: { text: t, options } } = this;
    const size = t.fontSize as number / 2;

    const text = GraphicsCreator.text(textValue, t, [coordinate[0] - size, coordinate[1] - size]);
    const square = GraphicsCreator.square(t.fontSize as number, t.stroke as number, coordinate);

    text.scale.set(0);
    square.alpha = options.alpha || 0.6;

    let MAXRotation = (Math.PI / 180) * 315;
    let rotationPerFrame = MAXRotation / (0.35 * 60);;
    let crotation = 0;
    let normalization = 0;

    tickerTransition.add((dt, remove) => {
      if (!text.scale) {
        remove();
        return;
      }

      crotation += rotationPerFrame * dt;
      normalization = Math.min(crotation / MAXRotation, 1);
      text.scale.set(normalization);
      square.rotation = normalization * MAXRotation;

      if (normalization === 1) remove();
    });

    return [square, text];
  }
  // 绘制后会覆写该方法
  destroy() {

  }
}