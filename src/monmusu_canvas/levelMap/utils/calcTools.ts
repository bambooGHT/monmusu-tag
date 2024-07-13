import { clamp } from "@/pixi1/utils";
import type { CoordinateTuple, DimensionTuple, CoordinateObject } from "./types";

const calcDistance = ({ x, y }: CoordinateObject, { x: x2, y: y2 }: CoordinateObject): number => {
  const distance = Math.hypot(x2 - x, y2 - y);
  return distance;
};

class CalcTools {
  /** 计算位置阈值 */
  static posThreshold(coordinate: CoordinateTuple, circleWidth: number, [width, height]: DimensionTuple) {
    const newCoordinate: CoordinateTuple = [0, 0];

    newCoordinate[0] = clamp(coordinate[0], circleWidth, width - circleWidth);
    newCoordinate[1] = clamp(coordinate[1], circleWidth, height - circleWidth);
    return newCoordinate;
  }
  /**
 * 计算给定坐标与一组坐标中的位置是否相邻
 * @param posArr - 一组坐标的数组
 * @param targetPos - 给定的坐标
 * @param maxDistance - 最大距离阈值
 * @returns 如果给定坐标与任何一个坐标位置相邻且距离小于等于最大距离阈值，则返回相邻位置的·索引·；如果没有相邻位置，则返回·-1·。
 */
  static posIsAdjacent<T extends CoordinateTuple>(posArr: T[], targetPos: T, maxDistance: number): number {
    const [x, y] = targetPos;
    const result = posArr.findIndex((v) => {
      let [posX, posY] = v;
      const newX = Math.abs(posX - x);
      const newY = Math.abs(posY - y);
      return newX <= maxDistance && newY <= maxDistance;
    });

    return result;
  }

  /**
   * 计算下一个点与当前点之间的距离及相关信息。
   * @param points - 包含坐标信息的点集合。
   */
  static nextPointDistance<T extends CoordinateObject>(points: T[]) {
    let currentPoint = points[0];
    let currentIndex = 0;
    // 当前点与下一点的距离
    let distance = 0;
    // 坐标差值
    const next = () => {
      const nextPoint = points[++currentIndex];
      const x = nextPoint.x - currentPoint.x;
      const y = nextPoint.y - currentPoint.y;
      distance = Math.sqrt(x ** 2 + y ** 2);

      const nextPointFunction = points[currentIndex + 1] ? next : undefined;
      const result = { currentPoint, currentIndex, deltaCoordinates: { x, y }, distance, next: nextPointFunction };

      currentPoint = nextPoint;
      return result;
    };

    return next();
  }
  /** 查找最近的位置 */
  static findNearestPosition<T extends [number, CoordinateObject]>(currentPos: CoordinateObject, targetPos: CoordinateObject, positions: T[]): T {
    let minTotalDistance = Infinity;
    let result: T = positions[0];

    for (const pos of positions) {
      const distanceToCurrent = calcDistance(pos[1], currentPos);
      const distanceToTarget = calcDistance(pos[1], targetPos);
      const totalDistance = distanceToCurrent + distanceToTarget;

      if (totalDistance < minTotalDistance) {
        minTotalDistance = totalDistance;
        result = pos;
      }
    }
    return result;
  }
}

export default CalcTools;
