import { Container, Graphics } from "pixi.js";
import { baseConfig } from "../../config";
import CalcTools from "../../utils/calcTools";
import GraphicsCreator from "../../utils/graphicsCreator";
import PixiApp from "@/pixi1/pixiApp";
import { drawCircleGroup } from "./drawCircleGroup";
import { MapRoutePath } from "./mapRoutePath";
import tickerTransition from "@/pixi1/tickerTransition";
import type { CoordinateObject, CoordinateTuple } from "../../utils/types";
import type { MapDrawable, RouteData } from "../mapEntityTypes";
import type { MapDesignConfig, PathStyle, RouteStyle } from "../../config";

export class MapRoute implements MapDrawable {
  view = new Container();

  private viewRoute: Container;

  private viewPath: Container;

  private routeDataList: Record<string, RouteData> = {};

  constructor(private mapDesignConfig: MapDesignConfig) {
    const route = new Container();
    const path = new Container();

    this.view.addChild(route, path);
    this.viewRoute = route;
    this.viewPath = path;
  }

  draw(routes: LevelMap.Route[]) {

    const baseStyleRoute = baseConfig.style.route;
    const baseStylePath = baseConfig.style.path;
    const colors = baseConfig.colors;
    const colorsLen = colors.length;
    const circleWidth = baseStyleRoute.circleWidth;
    const groupAdjacentDistance = circleWidth * 1.3;

    const getStyle = this.#getStyle(baseStyleRoute, baseStylePath);
    const calcRoutePos = this.#calcRouteCirclePosThreshold(circleWidth);

    const routeDataGroups: Record<string, RouteData[]> = {};
    // 保存已经存在的位置
    const routeExistPosList: CoordinateTuple[] = [];

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const { id, points } = route;
      // 没有路径取消绘制
      if (!points.length) continue;

      const color = colors[i % colorsLen];
      const routePos = calcRoutePos(points[0]);
      const { styleRoute, stylePath } = getStyle(color);

      const routeCircle = this.#createRouteCircle(id, routePos, styleRoute);
      const routeData: RouteData = { id, el: routeCircle, styleRoute, stylePath };

      let adjacentIndex = CalcTools.posIsAdjacent(routeExistPosList, routePos, groupAdjacentDistance);
      if (adjacentIndex === -1) {
        adjacentIndex = routeExistPosList.length;
        routeExistPosList.push(routePos);
      }
      (routeDataGroups[adjacentIndex!] ??= []).push(routeData);

      routeCircle.onpointertap = () => {
        const rouPath = new MapRoutePath(route, stylePath, this.mapDesignConfig.FPS);
        this.viewPath.addChild(rouPath.view);
        routeData.routePath = rouPath;
        rouPath.draw();

        routeCircle.onpointertap = () => {
          rouPath.draw();
        };
      };
    }

    const baseAlpha = baseStyleRoute.options.alpha!;
    const circles: Graphics[] = [];
    const routeDataList = Object.values(routeDataGroups).reduce((result: Record<string, RouteData>, group) => {
      const { circle, circleGroup } = this.#processRouteGroup(group);

      circle.alpha = 0;
      MapRoute.alphaTransition(circle, 0, baseAlpha, 0.3);
      MapRoute.alphaEvent(circle, baseAlpha, 0.3);
      circles.push(...(circleGroup ? [circleGroup, circle] : [circle]));

      group.forEach(p => {
        result[p.id] = p;
      });

      return result;
    }, {});

    this.viewRoute.addChild(...circles);
    this.routeDataList = routeDataList;
  }
  /** 绘制路由路径 */
  drawRoutePath(id: number) {
    this.routeDataList[id]?.routePath?.draw();
  }
  /** 清除路由路径 */
  clearRoutePath() {
    Object.values(this.routeDataList).forEach(p => {
      p.routePath?.destroy();
    });
  }

  destroy() {
    this.clearRoutePath();
    PixiApp.destroy(this.viewRoute.removeChildren());
    PixiApp.destroy(this.viewPath.removeChildren());
    this.routeDataList = {};
  }

  #createRouteCircle(textValue: string | number, coordinate: CoordinateTuple, style: RouteStyle) {
    const circle = GraphicsCreator.circle(style.options, style.circleWidth, coordinate);
    const text = GraphicsCreator.text(textValue, style.text, [0, 0]);
    circle.addChild(text);

    return circle;
  }

  #processRouteGroup(list: RouteData[]) {
    const { el, styleRoute } = list[0];

    if (list.length === 1) return { circle: el };

    const pos: CoordinateTuple = [el.x, el.y];
    const newStyle = {
      options: {
        ...styleRoute.options,
        color: 0xff6375,
      },
      circleWidth: styleRoute.circleWidth,
      text: {
        ...styleRoute.text,
        fontSize: list.length < 10 ? styleRoute.text.fontSize : (styleRoute.text.fontSize as number) * 0.9,
        fill: 0xff6375,
      }
    };

    const mapDesignConfig = this.mapDesignConfig;
    const circle = this.#createRouteCircle("x" + list.length, pos, newStyle);
    const { circleGroup, groupUnfold } = drawCircleGroup({
      mainCircle: circle,
      circleList: list.map(p => p.el),
      groupStlye: newStyle.options,
      space: 10,
      drawDuration: 0.3,
      boundaryRotation: [mapDesignConfig.width, mapDesignConfig.height]
    });

    circle.onpointertap = () => {
      groupUnfold();
      this.viewRoute.addChild(circleGroup, circle);
    };

    return { circle, circleGroup };
  };

  #calcRouteCirclePosThreshold(circleWidth: number) {
    const { width, height } = this.mapDesignConfig;
    const canvasSize: CoordinateTuple = [width, height];
    const minThreshold = circleWidth / 2;

    return (points: CoordinateObject) => {
      const oldPos: CoordinateTuple = [points.x - minThreshold, points.y - minThreshold];
      const newPos = CalcTools.posThreshold(oldPos, minThreshold, canvasSize);

      return newPos;
    };
  };

  #getStyle(baseStyleRoute: RouteStyle, baseStylePath: PathStyle) {
    return (color: number) => {
      const styleRoute: RouteStyle = {
        options: { ...baseStyleRoute.options, color },
        text: { ...baseStyleRoute.text, fill: color },
        circleWidth: baseStyleRoute.circleWidth
      };
      const stylePath: PathStyle = {
        options: { ...baseStylePath.options, color },
        text: { ...baseStylePath.text, fill: 0xf5f5f5, stroke: color, strokeThickness: 2 }
      };

      return { styleRoute, stylePath };
    };
  };

  static alphaEvent(graphics: Graphics, minAlpha: number, duration: number) {
    let Remove = () => { };

    graphics.onpointerenter = () => {
      Remove();
      Remove = this.alphaTransition(graphics, graphics.alpha, 1, duration);
    };
    graphics.onpointerleave = () => {
      Remove();
      Remove = this.alphaTransition(graphics, graphics.alpha, minAlpha, duration);
    };
  }

  static alphaTransition(graphics: Graphics, ca: number, ea: number, duration: number) {
    let deltaAlpha = ea - ca;

    if (deltaAlpha === 0) return () => { };

    let rotationPerFrame = ea / (duration * 60);
    if (deltaAlpha < 0) rotationPerFrame = -rotationPerFrame;

    return tickerTransition.add((dt, remove) => {
      ca += rotationPerFrame * dt;
      if ((deltaAlpha > 0 && ca >= ea) || (deltaAlpha < 0 && ca <= ea)) {
        ca = ea;
        remove();
      }
      graphics.alpha = ca;
    });
  };
}