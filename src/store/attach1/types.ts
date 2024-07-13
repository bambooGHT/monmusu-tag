import type { ItemValue } from "@/data";

export type AttachList = (DATA.Attach & { condition: boolean; });
export type Attach = {
  list: AttachList[];
  currentAttach: AttachList | undefined;
  attachAssocTokens: { unit: UNIT.Token, id: number; }[] | undefined;
  currentShopItem: { commodity: QUEST.Shop, items: ItemValue[]; } | undefined;
  suitableCharacters: UNIT.Character[];
  attachGetWays: DATA.AttachObtainWays;
  shopIcon: ObjIndex<string>;
  shopData: ObjIndex<QUEST.Shop>;
  conditionFilterLength: number;
};

export type AttachUpdate = {
  updateAttach(value?: AttachList): Promise<void>;
  updateShop(id?: number | string): Promise<void>;
};
