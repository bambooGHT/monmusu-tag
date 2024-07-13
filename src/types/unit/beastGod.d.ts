declare namespace UNIT {
  export interface BeastGod extends Character {
  }
  //兽神数据
  export type BomData = {
    id: number;
    name: string;
    summonIndex: number;
    time: number;
    stock: number;
    standby: number;
    interval: number;
    summonType: number;
    recoverCost: number;
    recoverCostMaxMagni: number;
  };
}