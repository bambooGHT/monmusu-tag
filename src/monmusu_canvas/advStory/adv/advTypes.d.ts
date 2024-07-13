declare namespace STORY {

  export type AdvScriptData = {
    name: string;
    scriptList: { scriptRows: AdvScriptRow<CommandParams>[]; }[];
  };

  export interface AdvScriptRow<command = CommandParams> {
    /** 行索引 */
    rowIndex: number;
    /** 命令参数列表 */
    commandParams: command;
    /** 是否为空 */
    isEmpty: number;
  }
  /** 命令数据 */
  export type CommandParams = {
    Command: keyof typeof EStory.CommandBase;
    Arg1: string;
    Arg2: string;
    Arg3: string;
    Arg4: string;
    Arg5: number;
    /** time */
    Arg6: number;
    WaitType: keyof typeof EStory.WaitType;
    Text: string;
    PageCtrl: string;
    Voice: string;
    WindowType: string;
    Arg7: string;
  };

  export type AdvSettingData = {
    Unit: Record<string, Setting_Unit>;
    Random: Record<string, Setting_Random>;
    Layer: Record<string, Setting_Layer>;
    ScaleVoice: Record<string, Setting_ScaleVoice>;
    UnitName: Record<string, Setting_UnitName>;
    Particle: Record<string, Setting_Particle>;
    Bgm: Record<string, Setting_Sound>;
    Se: Record<string, Setting_Sound>;
    Bg: Record<string, Setting_Picture>;
    Event: Record<string, Setting_Picture>;
    Sprite: Record<string, Setting_Picture>;
  };
  /** 角色 */
  export type Setting_Unit = {
    /** 角色名称 */
    CharacterName: string;
    /** 描述 */
    describe: string;
    /** 名称文本 */
    NameText: string;
    /** 模式 */
    Pattern: string;
    /** X坐标 */
    X: number;
    /** Y坐标 */
    Y: number;
    /** Z坐标 */
    Z: number;
    /** 旋转点 */
    Pivot: number;
    /** 缩放 */
    Scale: number;
    /** 条件 */
    Conditional: string;
    /** 文件路径 */
    FileName: string;
    /** 子文件路径 */
    SubFileName: string;
    /** 文件类型 */
    FileType: string;
    /** 动画 */
    Animation: string;
    /** 渲染纹理 */
    RenderTexture: string;
    /** 渲染矩形 */
    RenderRect: string;
    /** 眨眼 */
    EyeBlink: string;
    /** 唇语 */
    LipSynch: string;
    /** 图标文件路径 */
    Icon: string;
    /** 图标子文件路径 */
    IconSubFileName: string;
    /** 图标矩形 */
    IconRect: string;
  };

  export type Setting_Random = {
    /** 标签 */
    Label: string;
    /** 最小间隔 */
    IntervalMin: number;
    /** 最大间隔 */
    IntervalMax: number;
    /** 随机双倍 */
    RandomDouble: number;
    /** 标记 */
    Tag: string;
    /** 名称0 */
    Name0: string;
    /** 持续时间0 */
    Duration0: number;
    /** 名称1 */
    Name1: string;
    /** 持续时间1 */
    Duration1: number;
    /** 名称2 */
    Name2: string;
    /** 持续时间2 */
    Duration2: number;
    /** 名称3 */
    Name3: string;
    /** 持续时间3 */
    Duration3: number;
    /** 名称4 */
    Name4: string;
    /** 持续时间4 */
    Duration4: number;
  };
  /** 层级控制 */
  export type Setting_Layer = {
    /** 层名称 */
    LayerName: string;
    /** 描述 */
    describe: string;
    /** 类型 */
    Type: keyof typeof EStory.LayerType;
    /** X坐标 */
    X: number;
    /** Y坐标 */
    Y: number;
    /** 排序 */
    Order: number;
    /** 层蒙版 */
    LayerMask: string;
    /** X轴缩放 */
    ScaleX: number;
    /** Y轴缩放 */
    ScaleY: number;
    /** 水平翻转 */
    FlipX: boolean;
    /** 垂直翻转 */
    FlipY: boolean;
    /** 宽度 */
    Width: number;
    /** 高度 */
    Height: number;
    BorderLeft: number;
    BorderRight: number;
    BorderTop: number;
    BorderBottom: number;
    /** 对齐方式 */
    Align: string;
  };
  /** 语音控制 */
  export type Setting_ScaleVoice = {
    /** 标签 */
    Label: string;
    /** 类型 */
    Type: string;
    /** 间隔 */
    Interval: number;
    /** 标记 */
    Tag: string;
    /** 缩放音量 */
    ScaleVoiceVolume: number;
    /** 名称0 */
    Name0: string;
    /** 持续时间0 */
    Duration0: number;
    /** 名称1 */
    Name1: string;
    /** 持续时间1 */
    Duration1: number;
    /** 名称2 */
    Name2: string;
    /** 持续时间2 */
    Duration2: number;
    /** 名称3 */
    Name3: string;
    /** 持续时间3 */
    Duration3: number;
    /** 名称4 */
    Name4: string;
    /** 持续时间4 */
    Duration4: number;
  };
  /** 角色对应名称 */
  export type Setting_UnitName = {
    /** 标签 */
    Label: string;
    /** 类型 */
    Type: string;
    /** 名称 */
    Value: string;
    /** 文件类型 */
    FileType: string;
  };

  export type Setting_Particle = {
    /** 标签 */
    Label: string;
    /** 文件名 */
    FileName: string;
  };
  /** 声音 */
  export type Setting_Sound = {
    /** 标签 */
    Label: string;
    /** 标题 */
    Title: string;
    /** 类型 */
    Type: string;
    /** 文件名 */
    FileName: string;
    /** 介绍时间 */
    IntroTime: number;
    /** 音量 */
    Volume: number;
  };
  /** 图片 */
  export type Setting_Picture = {
    /** 标签 */
    Label: string;
    /** 类型 */
    Type: string;
    /** 文件名 */
    FileName: string;
    /** 文件类型 */
    FileType: string;
    /** X坐标 */
    X: number;
    /** Y坐标 */
    Y: number;
    /** Z坐标 */
    Z: number;
    /** 旋转点 */
    Pivot: number;
    /** 缩放 */
    Scale: number;
    /** 条件 */
    Conditional: string;
    /** 子文件名 */
    SubFileName: string;
    /** 动画 */
    Animation: string;
    /** 渲染纹理 */
    RenderTexture: string;
    /** 渲染矩形 */
    RenderRect: string;
    /** 缩略图 */
    Thumbnail: string;
    /** CG分类 */
    CgCategolly: string;
  };

}