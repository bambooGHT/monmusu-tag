export type FilterArrType = {
  is: boolean;
  id: number;
  name: string;
  list?: {
    is: boolean;
    id: number;
    name: string;
  }[];
};

export type FilterKey = "receiveType" | "classId" | "classId" | "rarityId" | "element" | "summon" | "trait";

export type ListInfo = (Pick<UNIT.Character, "id" | "nickname" | "charaName" | "element" | "receiveType" | "resource" | "rarityId" | "classId" | "text" | "trait_id_array">)[];

export type TokenInfo = { id: number; unit: UNIT.Token; isItself: boolean; }[];

export type UnitdisplayState = Map<number, boolean>;