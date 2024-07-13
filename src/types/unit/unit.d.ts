declare namespace UNIT {

  /** 单位类型 */
  export type UnitType = "character" | "beastGod" | "enemy" | "token";

  export type SpineInfo = {
    src: string,
    resourceCount: number;
  };
  /** 
    * C:小人
    * P:主立绘
    * S:静态立绘
    */
  export type SpineResource = { c: SpineInfo; p?: SpineInfo, s?: SpineInfo; _s?: SpineInfo; };
  /** 
   * P:主立绘
   * S:静态立绘
   */
  export type SpineDeResource = Omit<SpineResource, "c" | "_s">;

  export type SpineType = Unfold<keyof SpineResource>;

  /** 单位语音文本跟表情 */
  export type VoiceEmotes = Record<string, {
    "voice_id": number;
    "emote": string;
    "message": string;
  }>;
  /** 单位语音 */
  export type Voices = Record<string, string | string[]>;

  export type VoiceData = {
    voices: Voices;
    voiceEmotes: VoiceEmotes;
  };
  /** 稀有度对象列表 */
  export type Raritys = Unfolds<Record<EUnit.Rarity, {
    idName: string,
    name: string;
    skillFirstRate: number;
  }>>;
}