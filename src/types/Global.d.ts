function isNumber(data: unknown): data is number;
function isString(data: unknown): data is string;
function isObjectType<T extends unknown>(data: any): data is T;

declare type Unfold<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

declare type Unfolds<T> = T extends object ?
  T extends infer O ?
  { [K in keyof O]: Unfold<O[K]> } : never : T;


declare type ObjIndex<T = any> = Record<string, T>;
