import { Container, Graphics } from "pixi.js";
import type { MapDrawable, PointData } from "../mapEntityTypes";
import PixiApp from "@/pixi1/pixiApp";
import tickerTransition from "@/pixi1/tickerTransition";

type PointDistanceData = Omit<PointData, "currentIndex" | "next">;

type DistanceCoefficient = {
  first: number;
  last: number;
  alphaCoefficient: number;
};

enum MoveSpeed {
  SPEED = 30 / 60,
};

export class MapSummonPointMovePath implements MapDrawable {
  view = new Container();

  private removefn: (() => void) | undefined;

  private pointElList: Graphics[] = [];

  draw(movePath: PointData) {
    const [w, h, r] = [22, 8, 5];
    const [negW, negH] = [-w / 2, -h / 2];
    const pointElList: Graphics[][] = [];
    const pointDistanceList: PointDistanceData[] = [];

    let currentPath = movePath;
    while (currentPath) {
      const { next, ...pointDistanceData } = currentPath;
      const { deltaCoordinates, currentPoint, distance } = pointDistanceData;
      /** 元素的数量 */
      const pointCount = Math.ceil(distance / 50);
      const index = currentPath.currentIndex - 1;

      pointElList[index] = [];
      for (let i = 0; i < pointCount; i++) {
        const t = i / pointCount;
        const point = new Graphics().beginFill(0x00FF00).drawRoundedRect(negW, negH, w, h, r);
        const rotation = Math.atan2(deltaCoordinates.y, deltaCoordinates.x);

        point.rotation = rotation;
        point.position.set(currentPoint.x + deltaCoordinates.x * t, currentPoint.y + deltaCoordinates.y * t);
        pointElList[index].push(point);
      }

      pointDistanceList.push(pointDistanceData);
      currentPath = next?.() as any;
    }


    const maxLength = pointDistanceList.length - 1;
    const lastPoint = pointDistanceList[maxLength];
    const distanceCoefficient = {
      first: pointDistanceList[0].distance * 0.25,
      last: lastPoint.distance * 0.8,
      alphaCoefficient: lastPoint.distance * 0.2
    };

    const movePathFuncList = pointElList.flatMap((item, index) => {
      return item.map(p => this.#move(p, pointDistanceList, distanceCoefficient, index));
    });

    return () => {
      this.pointElList = pointElList.flat(1);
      this.view.addChild(...pointElList.flat(1));
      this.removefn = tickerTransition.add((dt) => {
        movePathFuncList.forEach(p => p(dt));
      });
    };
  }

  #move(el: Graphics, pDList: PointDistanceData[], dC: DistanceCoefficient, curIndex: number) {
    const maxLen = pDList.length - 1;

    let curPointData = pDList[curIndex],
      curPoint = curPointData.currentPoint,
      deltaCoord = curPointData.deltaCoordinates,

      rotation = 0,
      curRot = 0,
      curDist = Math.sqrt(
        (el.x - curPoint.x) ** 2 +
        (el.y - curPoint.y) ** 2
      ),
      rotationDiff = 0;

    const alphaTransition = () => {
      if (curIndex === maxLen && curDist >= dC.last) {
        const alpha = 1 - (curDist - dC.last) / dC.alphaCoefficient;
        el.alpha = alpha;
      } else if (curIndex === 0 && curDist <= dC.first) {
        const alpha = curDist / dC.first;
        el.alpha = alpha;
      }
    };

    alphaTransition();

    return (dt: number) => {
      if (curDist >= curPointData.distance) {
        curDist = 0;
        curRot = el.rotation;
        curPointData = curIndex === maxLen ? pDList[curIndex = 0] : pDList[++curIndex];
        curPoint = curPointData.currentPoint;
        deltaCoord = curPointData.deltaCoordinates;
        rotation = Math.atan2(deltaCoord.y, deltaCoord.x);
        rotationDiff = rotation - curRot;
      }

      if (curRot !== rotation) {
        curRot += (rotationDiff * 0.05);
        if (Math.abs(rotation - curRot) < 0.001) {
          curRot = rotation;
        }
        el.rotation = curRot;
      }

      let dc = (curDist += MoveSpeed.SPEED * dt) / curPointData.distance;
      if (dc > 1) {
        dc = 1;
        curDist = curPointData.distance;
      }

      const x = dc * deltaCoord.x + curPoint.x;
      const y = dc * deltaCoord.y + curPoint.y;

      alphaTransition();
      el.position.set(x, y);
    };
  }

  remove() {
    this.removefn?.();
    this.view.removeChildren();
  }

  destroy() {
    this.remove();
    PixiApp.destroy(this.pointElList);
  }
}