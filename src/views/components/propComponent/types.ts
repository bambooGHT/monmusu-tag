import { IconName } from '@/data';

export type PropsData = {
  rarity: EData.Rarity | EUnit.Rarity;
  id: number | string;
  iconKey: keyof typeof IconName;
};

export type PropData2 = {
  text?: string;
  seat?: "top" | "right" | "bottom";
};