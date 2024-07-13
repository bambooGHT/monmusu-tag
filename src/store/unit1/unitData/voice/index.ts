import { shallowReactive } from "vue";
import { UnitVoiceData } from "./types";
import { Url } from "@/service";
import Audio from "@/utils/audio";
import TimeFormat from "@/utils/timeFormat";
import monmusuSpine from "../spine";

export * from "./voiceTitles";

class MonmusuVoice {
  private audio: Audio;
  private timer: number | undefined = 0;
  data = shallowReactive<UnitVoiceData>({
    voices: {},
    voiceEmotes: {},
    currentVoice: {
      id: "",
      index: 0
    },
    duration: "00:00",
    currentTime: "00:00",
    playProgress: "100%",
    loadProgress: "0%"
  });

  constructor() {
    const { data } = this;
    const audio = new Audio();
    const unitSpineProgram = monmusuSpine.unitSpineProgram;

    audio.onCanplay = () => {
      const anima = data.voiceEmotes[data.currentVoice.id]?.emote;
      data.duration = TimeFormat.duration(audio.duration);
      this.#playProgress();

      if (anima && unitSpineProgram.hasAnimation(anima)) {
        unitSpineProgram.toggleAnimation(anima);
      }
    };

    audio.onProgress = () => {
      const buffered = this.audio.buffered;
      data.loadProgress = buffered.end(0) / this.audio.duration * 100 + "%";
    };

    audio.volume = 0.75;
    this.audio = audio;
  }

  updateVoice(voice: UNIT.VoiceData) {
    const { data } = this;
    data.voices = voice.voices;
    data.voiceEmotes = voice.voiceEmotes;

    this.stop();
  }

  play(src: string, id: string, index: number) {
    const { data, audio } = this;
    const url = Url(src);

    data.currentVoice = { id, index };
    clearTimeout(this.timer);
    this.#resetPlay("0%");
    audio.play(url);
  }

  stop() {
    clearTimeout(this.timer);
    this.audio.stop();
    this.#resetPlay();
  }

  resetData() {
    const { data } = this;
    data.voices = {};
    data.voiceEmotes = {};
    data.currentVoice = {
      id: "",
      index: 0
    };
  }

  #resetPlay(playProgress = "100%") {
    const { data } = this;
    data.duration = "00:00";
    data.currentTime = "00:00";
    data.playProgress = playProgress;
    data.loadProgress = "0%";
  }

  #playProgress() {
    const { audio, data } = this;
    const update = () => {
      this.timer = setTimeout(() => {
        const currentTime = audio.currentTime;
        data.currentTime = TimeFormat.duration(currentTime);
        data.playProgress = currentTime / audio.duration * 100 + "%";

        if (currentTime !== audio.duration) {
          update();
        }
      }, 15);
    };
    update();
  }
}

const monmusuVoice = new MonmusuVoice();
export default monmusuVoice;