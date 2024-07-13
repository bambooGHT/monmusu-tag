import Spine2d from "@/pixi1/spine2d";
import { BaseCommand } from "../baseCommand";
import { designConfig, displayEl, layerEl } from "../adcCommandSetting";
import gsap from "gsap";
import type { Spine } from "pixi-spine";

export class CommandCharacter extends BaseCommand {
  async execute(params: STORY.CommandParams): Promise<void> {
    const characterSetting = AdvGlobal.advStorySettingData.getSettingValue("Unit", params.Arg1);

    if (!characterSetting) return;

    const { Arg1, Arg2, Arg3, Arg4 = 0, Arg5 = 0, Arg6 } = params;
    const characterLayer = layerEl.getLayer(Arg3, true);


    let spine = displayEl.get("Character", Arg1) as Spine;
    // xy type === number
    if (Arg4) characterLayer.x = Arg4 as any;
    if (Arg5) characterLayer.y = Arg5 as any + 100;

    if (!spine) {
      const unit = await Spine2d.load(characterSetting.FileName, {
        animation: Arg2,
        animationLoop: true
      });

      spine = unit.spine;
      characterLayer.addChild(spine);
      displayEl.set("Character", Arg1, spine);

      const { canvas_width, canvas_height } = designConfig;
      const { X, Y, Scale } = characterSetting;

      spine.width = Math.fround(spine.width * Scale);
      spine.height = Math.fround(spine.height * Scale);
      spine.position.set(canvas_width / 2 - X, canvas_height / 2 - Y);
      spine.alpha = 0;
      gsap.to(spine, {
        alpha: 1,
        duration: Arg6,
      });
    }
  }
}