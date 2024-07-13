import { CommandFade } from "../commandBase";
import gsap from "gsap";
import { designConfig } from "../adcCommandSetting";

export class CommandFadeOut extends CommandFade {
  async execute(params: STORY.CommandParams) {
    super.execute(params);

    const view = this.view;
    gsap.killTweensOf(view);

    view.clear()
      .beginFill(params.Arg1)
      .drawRect(0, 0, designConfig.canvas_width, designConfig.canvas_height)
      .alpha = 0;
    await gsap.to(view, { alpha: 1, duration: params.Arg6 });
  }
}