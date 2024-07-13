namespace EStory {

  export enum StorySettingType {
    Unit = "Unit",
    Random = "Random",
    Layer = "Layer",
    ScaleVoice = "ScaleVoice",
    UnitName = "UnitName",
    Particle = "Particle",
    Bgm = "Bgm",
    Se = "Se",
    Bg = "Bg",
    BgEvent = "Event",
    Sprite = "Sprite"
  }

  export enum LayerType {
    Bg,
    Character,
    Sprite,
    Dummy,
    Max
  }

  export enum TargetType {
    Default,
    Camera,
    Graphics,
    MessageWindow
  }

  export enum CommandBase {
    "" = "CommandText",

    FadeOut = "CommandFadeOut",
    FadeIn = "CommandFadeIn",

    Wait = "CommandWait",

    Bgm = "CommandBgm",
    Se = "CommandSe",
    StopSound = "CommandStopSound",

    Bg = "CommandBg",
    BgEvent = "CommandBgEvent",
    BgEventOff = "CommandBgEventOff",

    CharacterOff = "CommandCharacterOff",

    Tween = "CommandTween",

    LayerReset = "CommandLayerReset"
  }

  export enum CommandOther {
    Voice = "CommandVoice",
    Character = "CommandCharacter"
  }

  export enum WaitType {
    ThisAndAdd,
    PageWait,
    InputWait,
    Add,
    NoWait
  }

  export enum CommandTweenType {
    ColorFrom,
    ColorTo,
    MoveAdd,
    MoveBy,
    MoveFrom,
    MoveTo,
    PunchPosition,
    PunchRotation,
    PunchScale,
    RotateAdd,
    RotateBy,
    RotateFrom,
    RotateTo,
    ScaleAdd,
    ScaleBy,
    ScaleFrom,
    ScaleTo,
    ShakePosition,
    ShakeRotation,
    ShakeScale,
    Stop,
    Max
  }
}

(<any>window).EStory = EStory;