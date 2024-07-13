import gsap from "gsap";
import { resourceTypePrefixes } from "./config";

class Sound {
  el: HTMLAudioElement = new Audio();;

  get volume() {
    return this.el.volume;
  }

  set volume(v: number) {
    this.el.volume = v;
  }

  async play(src: string) {
    const el = this.el;
    el.src = src;
    el.play();

    return new Promise(res => {
      el.onended = () => {
        el.onended = null;
        res("ok");
      };
    });
  };

  pause() {
    this.el.pause();
  }

  stop() {
    this.pause();
    this.el.src = "";
    this.el.load();
  }
};

const sound = {
  Bgm: new Sound(),
  Se: new Sound(),
  Voice: new Sound(),
  Ambience: new Sound(),
};

export type SoundCategory = keyof typeof sound;

export class AdvAudio {
  private static audioInstance: HTMLAudioElement[] = [];
  private static basePath = import.meta.env.VITE_ASSETS_URL;
  private _globalVolume = 0.5;

  constructor() {
    const globalVolume = this._globalVolume;

    sound.Bgm.volume = 1 * globalVolume;
    sound.Se.volume = 1 * globalVolume;
    sound.Voice.volume = 1 * globalVolume;
    sound.Voice.volume = 1 * globalVolume;
  }

  getVolume(type: SoundCategory) {
    return sound[type].volume;
  }

  async setVolume(type: SoundCategory, v: number, time: number = 0) {
    await gsap.to(sound[type], { volume: v * this._globalVolume, duration: time });
  }

  setGlobalVolume(v: number) {
    this._globalVolume = v;
  }

  async play(type: SoundCategory, src: string) {
    const el = sound[type];

    gsap.killTweensOf(el);
    src = AdvAudio.basePath + resourceTypePrefixes[type] + src;
    await el.play(src);
  }

  stop(type: SoundCategory, time?: number) {
    const el = sound[type];

    if (time) {
      gsap.to(el, {
        volume: 0, duration: time, ease: "linear", onComplete: () => {
          el.volume = 1 * this._globalVolume;
          console.log(el);
        }
      });
      return;
    }

    el.stop();
  }

  static preLoad(type: SoundCategory, src: string): void {
    src = AdvAudio.basePath + resourceTypePrefixes[type] + src;

    const audio = new Audio(src);

    audio.preload = "auto";
    audio.oncanplaythrough = () => {
      const index = AdvAudio.audioInstance.indexOf(audio);
      if (index !== -1) {
        AdvAudio.audioInstance.splice(index, 1);
      }
    };

    AdvAudio.audioInstance.push(audio);
  }

  static cancelPreload(): void {
    AdvAudio.audioInstance.forEach(p => {
      p.oncanplaythrough = null;
      p.src = '';
      p.load();
    });

    AdvAudio.audioInstance = [];
  }
}

export const advAudio = new AdvAudio();