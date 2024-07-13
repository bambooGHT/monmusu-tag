import SpineEvent from "./spineEvent";
import tickerTransition from "@/pixi1/tickerTransition";


export class KeyboardControl extends SpineEvent {
  private moveAnimationName = "walk";
  private waitAnimationName = "wait";
  private KeyTigger: ObjIndex = {
    'ArrowLeft': false,
    'ArrowUp': false,
    'ArrowRight': false,
    'ArrowDown': false,
  };
  private keyNames = new Set(Object.keys(this.KeyTigger));

  open(): void {
    if (this.config.currentSpineType !== "c") return;

    const moveFunction = this.#move();
    const keyDownCallback = this.#getKeyDown();
    const KEYupCallback = this.#getKeyUp();
    window.addEventListener("keydown", keyDownCallback);
    window.addEventListener("keyup", KEYupCallback);
    const remove = tickerTransition.add(moveFunction);

    this.closure = () => {
      window.removeEventListener("keydown", keyDownCallback);
      window.removeEventListener("keyup", KEYupCallback);
      remove();
      super.closure();
      this.closure = () => { super.closure(); };
    };
  }
  closure = () => { super.closure(); };

  #getKeyDown() {
    const { keyNames, KeyTigger, moveAnimationName, spine, config } = this;

    const currentAnimation = <any>spine.state.tracks;

    return (e: KeyboardEvent) => {
      if (!keyNames.has(e.key)) return;
      e.preventDefault();
      KeyTigger[e.key] = true;
      if (currentAnimation[0].animation.name !== moveAnimationName) {
        spine.state.setAnimation(0, moveAnimationName, true);
      }
    };
  }

  #getKeyUp() {
    const { waitAnimationName, KeyTigger, keyNames, spine, config } = this;
    return (e: KeyboardEvent) => {
      if (!keyNames.has(e.key)) return;
      e.preventDefault();
      KeyTigger[e.key] = false;
      if (!Object.values(KeyTigger).includes(true)) {
        spine.state.setAnimation(0, waitAnimationName, config.events.repeatAnimation);
      }
    };
  }

  #move() {
    const { KeyTigger, spine, config } = this;
    return () => {
      const moveSpeed = config.animationSpeed * 2;

      if (KeyTigger['ArrowLeft']) {
        if (spine.scale.x > 0) spine.scale.x = -spine.scale.x;
        spine.x -= moveSpeed;
      }
      else if (KeyTigger['ArrowRight']) {
        if (spine.scale.x < 0) spine.scale.x = Math.abs(spine.scale.x);
        spine.x += moveSpeed;
      };
      if (KeyTigger['ArrowUp']) spine.y -= moveSpeed;
      else if (KeyTigger['ArrowDown']) spine.y += moveSpeed;
    };
  }
}