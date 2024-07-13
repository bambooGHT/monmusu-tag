export type SpineEvents = {
  pointerMove: boolean;
  clickAnimation: boolean;
  repeatAnimation: boolean;
  // ClickVoice: boolean;
  keyboardControl: boolean;
  slider: boolean;
};

export type SpineSlider = {
  y: number,
  scale: number;
};

export type SpineType = keyof UNIT.SpineResource;