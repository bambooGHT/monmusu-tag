import { Assets, BLEND_MODES, Sprite } from "pixi.js";
import { IconUrl, type NpcList } from "./mapEntityTypes";
import GraphicsCreator from "../utils/graphicsCreator";
import type { SizeTuple, CoordinateObject } from "../utils/types";
import Spine2d from "@/pixi1/spine2d";
import { useSWRAsync } from "@/service";

export class MapEntity {
  static async drawCoreLife(corePos: CoordinateObject[], iconUrl: IconUrl, sizeRatio: SizeTuple) {
    return await Promise.all(corePos.map(async (p) => {
      const core = await GraphicsCreator.icon({ src: iconUrl.icon, sizeRatio, coordinate: p });
      const highlightIcon2 = await GraphicsCreator.icon({ src: iconUrl.highlightIcon[0], blendMode: BLEND_MODES.ADD });
      core.addChild(highlightIcon2);

      return core;
    }));
  };

  static async drawNpc(npclist: NpcList, scaleRatio: SizeTuple) {
    return Promise.all(npclist.map(async p => {
      const res = await useSWRAsync("unitSpineResource", false, { id: p.resource });
      const npc: Spine2d = await Spine2d.load(res.c.src, {
        animation: true,
        animationLoop: true,
      });

      const { spine } = npc;
      const x = (scaleRatio[0] - 1) / 2;

      if (spine.width * x > 100) {
        const y = (scaleRatio[1] - 1) / 2;
        spine.scale.set((x + y) / 2);
      }

      if (p.lookAtLeft) {
        spine.scale.x = -spine.scale.x;
      }
      spine.position.set(...p.summonPointPos);

      return npc;
    }));
  }

  static async drawBg(src: string, size: { width: number, height: number; }) {
    const texture = await Assets.load({ src, alias: src, data: { alphaMode: 0 } });
    const bg = Sprite.from(texture);

    bg.width = size.width;
    bg.height = size.height;
    return bg;
  }
}
