export default abstract class AudioPlayer {
  protected audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  abstract play(url?: string): void;

  abstract stop(): void;

  protected pause(): void {
    this.audio.pause();
  }

  protected resets() {
    const { audio } = this;
    audio.load();
    audio.play();
  }

  set volume(value: number) {
    this.audio.volume = value;
  };

  get volume(): number {
    return this.audio.volume;
  };

  set currentTime(value: number) {
    this.audio.currentTime = value;
  };

  get currentTime(): number {
    return this.audio.currentTime;
  };

  get duration(): number {
    return this.audio.duration;
  };

  get buffered(): TimeRanges {
    return this.audio.buffered;
  }
}