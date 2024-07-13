export type CanvasSize = [number, number];

export type Coordinates = (CanvasSize | [number, number, number, number])[];

export type iconBasePath = (id: string | number) => string;

export type IconItem = {
  frame: string;
  bg: string;
};

/** 角色稀有度边框 */
export type Face = {
  frame: string;
  beastGod: string;
  unit: string;
  bg: string;
  unitbg: string;
};

//Key
export type Key = string | number;
