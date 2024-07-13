
export type UnitVoiceData = {
  voices: UNIT.Voices;
  voiceEmotes: UNIT.VoiceEmotes;
  currentVoice: {
    id: string;
    index: number;
  };
  /** 总时长 */
  duration: string,
  /** 当前时长 */
  currentTime: string;
  /** 播放进度 */
  playProgress: string;
  /** 加載進度 */
  loadProgress: string;
};