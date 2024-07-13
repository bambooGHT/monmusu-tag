import { LINE_JOIN, type ILineStyleOptions, type ITextStyle } from "pixi.js";
import { AppConfig } from "../appConfig";

type TextStyle = Partial<ITextStyle>;

export interface PathStyle {
  options: ILineStyleOptions;
  text: TextStyle;
};

export interface RouteStyle extends PathStyle {
  circleWidth: number;
};

export interface DesignConfig extends AppConfig {
  FPS: number;
}

const _textStyle: TextStyle = {
  fontSize: 38,
  fontWeight: "900",
  lineHeight: 26,
  dropShadow: true,
  dropShadowBlur: 5,
  dropShadowDistance: -1,
  fontFamily: "Century Gothic",
} as const;

export const baseConfig = {
  colors: [
    0x00FFFF,//春绿
    0x00FF00,//绿色
    0xFF4500,//橙红色
    0xFF00FF,//中紫色
    0x0564FF,
    0x00d9ff,
    0xa332ff,//紫色
    0x23272E,
    0x9ACD32,//绿豆色
    0xFFD700,//Gold
  ],
  style: {
    route: {
      options: {
        width: 5,
        alpha: 0.6,
      },
      circleWidth: 44,
      text: Object.assign({}, _textStyle)
    } as RouteStyle,

    path: {
      options: {
        width: 44,
        alpha: 0.38,
        join: LINE_JOIN.ROUND,
        alignment: 0.5
      },
      text: Object.assign({}, _textStyle, { fontSize: 36 }),
    } as PathStyle,
    
    summonIndex: Object.assign({}, _textStyle, { fontSize: 18, fill: 0xffffff })
  }
};

export class MapDesignConfig extends AppConfig implements DesignConfig {
  readonly FPS: number;
  constructor(width: number, height: number, FPS: number) {
    super(width, height);
    this.FPS = FPS;
  }
}

export class MapConfig {
  isDrawNpc = true;
  isZoom = true;
  isDrawCore = true;
  isDrawRoute = true;
  isDrawSummonPoint = true;

  constructor() {
    const _mapOptions = localStorage.getItem("mapOptions");
    if (_mapOptions) Object.assign(this, JSON.parse(_mapOptions));
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        localStorage.setItem("mapOptions", JSON.stringify(this));
      }
    });
  }
}