import type { CalcAbilitiesProps } from "../types";

abstract class AttributesAbs<T> {
  constructor(protected readonly data: T, protected readonly props: Readonly<CalcAbilitiesProps>) {
  };
  abstract getAttributes(...args: any[]): ABILITIES.Attributes;
}

export default AttributesAbs;