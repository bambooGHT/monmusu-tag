import tickerTransition from "@/pixi1/tickerTransition";
import { clamp } from "@/pixi1/utils";
import { Graphics, type FederatedPointerEvent, type ILineStyleOptions } from "pixi.js";
import type { CoordinateTuple } from "../../utils/types";

type CircleGroupParams = {
  mainCircle: Graphics,
  circleList: Graphics[],
  groupStlye: ILineStyleOptions,
  drawDuration?: number;
  space?: number;
  boundaryRotation?: CoordinateTuple;
};

export const drawCircleGroup = (data: CircleGroupParams) => {
  const {
    mainCircle,
    circleList,
    groupStlye,
    space = 0,
    drawDuration = 0.5,
    boundaryRotation
  } = data;
  const circleGroup = new Graphics();

  const coordinates = calcCircleGroupPos({
    mainCircleSize: mainCircle.width,
    circleSize: circleList[0].width,
    count: circleList.length,
    space,
  });

  const rotationAngle = boundaryRotation ? calcCircleBoundaryRotation(mainCircle, circleList.length, boundaryRotation) : 0;
  const totalDistance = Math.hypot(coordinates[0][0], coordinates[0][1]) + mainCircle.width / 2 + space;
  const groupRotation = () => {
    const mX = mainCircle.x + mainCircle.width / 2;
    const mY = mainCircle.y + mainCircle.height / 2;
    let angle = circleGroup.rotation;

    return (e: FederatedPointerEvent) => {
      e.stopPropagation();

      let cAngle = 0;
      const [x, y] = [e.x, e.y];
      const xThold = e.screenY > mY ? -0.1 : 0.1;
      const yThold = e.screenX > mX ? 0.1 : -0.1;

      const pointermove = (event: PointerEvent) => {
        const X = event.x - x;
        const Y = event.y - y;
        cAngle = (X * xThold + Y * yThold) / Math.PI;

        circleGroup.rotation = cAngle + angle;
        circleList.forEach((circle) => {
          circle.cursor = "all-scroll";
          circle.rotation = -cAngle + -angle;
        });
      };
      const pointerup = () => {
        circleList.forEach(p => p.cursor = "pointer");
        angle = cAngle + angle;

        document.removeEventListener("pointermove", pointermove);
        document.removeEventListener("pointerup", pointerup);
      };

      document.addEventListener("pointermove", pointermove);
      document.addEventListener("pointerup", pointerup);
    };
  };

  const groupUnfold = () => {
    // 是否绘制中
    let drawing = false;
    // 是否为展开状态
    let unfold = false;
    // 每帧距离
    let distancePerFrame = totalDistance / (drawDuration * 60);;
    // 当前已绘制距离
    let cDist = 0;

    return () => {
      if (drawing) return;
      drawing = true;

      tickerTransition.add((dt, remove) => {
        if ((!unfold && cDist >= totalDistance) || (unfold && cDist <= 0)) {
          drawing = false;
          remove();
          unfold = !unfold;
          distancePerFrame = unfold ? -distancePerFrame : Math.abs(distancePerFrame);
          return;
        }

        cDist += distancePerFrame * dt;
        const normalization = clamp(cDist / totalDistance, 0, 1);

        circleList.forEach((circle, index) => {
          const [deltaX, deltaY] = coordinates[index];
          const X = normalization * deltaX;
          const Y = normalization * deltaY;

          circle.position.set(X, Y);
          circle.alpha = normalization;
        });

        circleGroup.alpha = normalization;
        circleGroup.clear()
          .beginFill(0xffffff, 0.6)
          .lineStyle(groupStlye)
          .drawCircle(0, 0, normalization * totalDistance);
      });
    };
  };

  circleList.forEach((circle) => {
    circle.alpha = 0;
    circle.x = 0;
    circle.y = 0;
    circle.rotation = -rotationAngle;
  });

  circleGroup.rotation = rotationAngle;
  circleGroup.eventMode = "static";
  circleGroup.cursor = "all-scroll";
  circleGroup.position.set(mainCircle.x, mainCircle.y);
  circleGroup.addChild(...circleList);
  circleGroup.onpointerdown = groupRotation();

  return { circleGroup, groupUnfold: groupUnfold() };
};

const calcCircleGroupPos = (data: {
  mainCircleSize: number,
  circleSize: number,
  count: number,
  space?: number;
}) => {
  const { mainCircleSize, circleSize, count, space = 0 } = data;
  const mCRadius = mainCircleSize / 2;
  const cRadius = circleSize / 2;
  const baseAngle = (count < 6 ? 1 + Math.max(0, count - 3) / 3 : 2) * Math.PI / count;
  const distance = space + mCRadius + cRadius + Math.max(0, (count - 6) * (cRadius / 3));

  const coordinates: CoordinateTuple[] = [];

  for (let i = 0; i < count; i++) {
    const angle = i * baseAngle;
    const x = Math.sin(angle) * distance;
    const y = Math.cos(angle) * distance;
    coordinates.push([x, y]);
  }

  return coordinates;
};

const calcCircleBoundaryRotation = (circle: Graphics, count: number, boundaryPos: CoordinateTuple) => {
  let [bw, bh] = boundaryPos;
  let cx = circle.x;
  let xy = circle.y;
  let mCRadius = circle.width / 2;

  let rotationAngle = 0;
  let baseAngle = Math.PI / 6 * (count - 1);

  const isNearTop = xy - mCRadius <= 0;
  const isNearBottom = xy + mCRadius >= bh;
  const isNearLeft = cx - mCRadius <= 0;
  const isNearRight = cx + mCRadius >= bw;

  if (count <= 5) {
    if (isNearTop) {
      rotationAngle = baseAngle;
    } else if (isNearBottom) {
      rotationAngle = Math.PI + baseAngle;
    } else if (isNearLeft) {
      rotationAngle = Math.PI * 1.5 + baseAngle;
    } else if (isNearRight) {
      rotationAngle = Math.PI / 2 + baseAngle;
    }

    if ((isNearTop && isNearLeft) || (isNearBottom && isNearRight)) {
      rotationAngle -= Math.PI / 4;
    } else if ((isNearTop && isNearRight) || (isNearBottom && isNearLeft)) {
      rotationAngle += Math.PI / 4;
    }
  }

  if (count === 2 && rotationAngle) {
    rotationAngle += baseAngle / 2;
  }

  return rotationAngle;
};