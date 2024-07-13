import { CommandFade } from "../commandBase";
import gsap from "gsap";

export class CommandFadeIn extends CommandFade {
  async execute(params: STORY.CommandParams) {
    super.execute(params);

    gsap.killTweensOf(this.view);
    await gsap.to(this.view, {
      alpha: 0,
      duration: params.Arg6,
      pixi: { fillColor: params.Arg1 },
    });
  }
}