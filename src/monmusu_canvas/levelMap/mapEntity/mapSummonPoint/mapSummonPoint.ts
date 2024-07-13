import type { CoordinateTuple, SizeTuple } from "../../utils/types";
import type { MapDrawable, RemovablePosGrpup, SummonPointData, GetSummonType } from "../mapEntityTypes";
import { BLEND_MODES, Container, type FederatedPointerEvent, type Sprite } from "pixi.js";
import GraphicsCreator from "../../utils/graphicsCreator";
import { baseConfig } from "../../config";
import PixiApp from "@/pixi1/pixiApp";
import { MapSummonPointMovePath } from "./mapSummonPointMovePath";
import GraphSearch from "../../utils/graphSearch";
import CalcTools from "../../utils/calcTools";

export class MapSummonPoint implements MapDrawable {
  view = new Container();
  private drawMovePath!: MapSummonPointMovePath;

  constructor(private getSummonType: GetSummonType) { }

  async draw(summonPoints: LevelMap.SummonPoint[], sizeRatio: SizeTuple) {
    const { view, getSummonType } = this;

    summonPoints = summonPoints.filter(p => p.summonType !== 4);

    const summonPointRemovableGroups = this.#classifyRemovableGroups(summonPoints);
    const mapSummonPointData: SummonPointData = {};
    const textPos: CoordinateTuple = [0, 15];

    await Promise.all(summonPoints.map(async (item) => {
      const { summonType, attr, point, id } = item;
      const pos: CoordinateTuple = [point.x, point.y];

      const summonTypeUrl = getSummonType(summonType, attr);
      const summonPoint = await GraphicsCreator.summonPoint(summonTypeUrl.icon, sizeRatio, pos);
      const text = GraphicsCreator.text(id, baseConfig.style.summonIndex, textPos);

      text.alpha = 0.9;
      summonPoint.addChild(text);
      view.addChild(summonPoint);

      mapSummonPointData[id] = { el: summonPoint, summonType, attr, id: id };
    }));

    const { drawFn, drawMovePath } = this.summonPointMovePath(mapSummonPointData);
    Object.values(mapSummonPointData).forEach(v => {
      const removableGroup = summonPointRemovableGroups.find(p => p.removableIds[v.id])!;
      v.el.onpointerdown = (e) => {
        drawFn(e, v.id, removableGroup);
      };
    });
    this.view.addChild(drawMovePath.view);
    this.drawMovePath = drawMovePath;
  }

  destroy(): void {
    this.drawMovePath?.destroy();
    PixiApp.destroy(this.view.removeChildren());
  }

  #classifyRemovableGroups(summonPoints: LevelMap.SummonPoint[]) {
    const movableGroups: RemovablePosGrpup[] = [];

    let getRemovableGroup = (id: number) => movableGroups.filter((group) => {
      return Object.values(group.removableIds).flat(1).includes(id);
    });

    for (const item of summonPoints) {
      const { id, point: { x, y }, edge } = item;
      const [group, ...groups] = getRemovableGroup(id);
      if (group) {
        group.removableIds[id] = edge;
        group.positions[id] = { x, y };

        if (groups[0]) {
          groups.forEach((p) => {
            Object.assign(group.removableIds, p.removableIds);
            Object.assign(group.positions, p.positions);
            movableGroups.splice(movableGroups.indexOf(p), 1);
          });
        }
      } else {
        movableGroups.push({
          removableIds: { [id]: edge },
          positions: { [id]: { x, y } }
        });
      }
    }

    return movableGroups;
  }

  summonPointMovePath(summonPointData: SummonPointData) {
    const drawHighlightIcon = this.highlightIconFunc(summonPointData);
    const drawMovePath = new MapSummonPointMovePath();
    const getShortestPaths = (start: number, endId: number, removablePosGrpup: RemovablePosGrpup) => {
      return GraphSearch.breadthFirstSearch(start, endId, removablePosGrpup.removableIds)!.map((id) => {
        return removablePosGrpup.positions[id];
      });
    };

    let curStartId = 0;
    let curEndId = 0;
    let drawIng = false;
    let curDrawFn: undefined | (() => void) = undefined;
    let removeHighlightIcon: (() => void) | undefined = () => { };

    const drawFn = async (e: FederatedPointerEvent, startId: number, removablePosGrpup: RemovablePosGrpup) => {
      const { [startId]: startPos, ...remainingPositions } = removablePosGrpup.positions;
      const idList = Object.keys(remainingPositions).map(p => +p);
      drawMovePath.remove();
      curDrawFn = undefined;

      let id;
      const pointerMove = () => {
        id = idList.find(p => {
          const { screenX: x, screenY: y } = e;
          return summonPointData[p].el.containsPoint({ x, y });
        });

        if (!id) {
          drawIng && drawMovePath.remove();
          drawIng = false;
          return;
        };
        if (id === curEndId && startId === curStartId && curDrawFn) {
          if (!drawIng) {
            drawIng = true;
            curDrawFn();
          }
          return;
        }

        drawMovePath.destroy();
        curStartId = startId;
        curEndId = id;
        drawIng = true;

        const shortestMovePaths = getShortestPaths(startId, id, removablePosGrpup);
        const movePath = CalcTools.nextPointDistance<any>(shortestMovePaths);

        curDrawFn = drawMovePath.draw(movePath);
        curDrawFn();
      };

      const pointerup = () => {
        removeHighlightIcon?.();
        removeHighlightIcon = undefined;
        document.removeEventListener("pointermove", pointerMove);
        document.removeEventListener("pointerup", pointerup);
      };

      document.addEventListener("pointermove", pointerMove);
      document.addEventListener("pointerup", pointerup);

      removeHighlightIcon = await drawHighlightIcon(Object.keys(removablePosGrpup.positions));
    };

    return { drawFn, drawMovePath };
  }

  highlightIconFunc(summonPointData: SummonPointData) {
    const { getSummonType } = this;

    return async (removableGroupIdList: string[]) => {

      const elList: Sprite[] = [];
      await Promise.all(removableGroupIdList.map(async (id) => {
        const { el, summonType, attr } = summonPointData![id];
        const [icon1, icon2] = getSummonType(summonType, attr).highlightIcon;
        const hi1 = await GraphicsCreator.icon({ src: icon1 });
        const hi2 = await GraphicsCreator.icon({ src: icon2, blendMode: BLEND_MODES.ADD });

        hi1.addChild(hi2);
        el.addChild(hi1);

        elList.push(hi1);
      }));

      return () => {
        PixiApp.destroy(elList);
      };
    };
  }
}