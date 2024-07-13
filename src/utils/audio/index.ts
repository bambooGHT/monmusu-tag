import AudioPlayer from "./AudioPlayer";

export default class Audio extends AudioPlayer {
  play(url?: string): void {
    if (url) {
      this.audio.src = url;
      this.resets();
    } else {
      this.audio.play();
    }
  }

  stop(): void {
    this.pause();
  }
  
  set onCanplay(callBck: () => void) {
    this.audio.oncanplay = callBck;
  }
  set onProgress(callBck: () => void) {
    this.audio.onprogress = callBck;
  }
}