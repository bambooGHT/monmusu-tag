import { getIconItem, getIconFace, IconName, getIcon, drawIconsToURL } from '@/data';
import type { Coordinates, CanvasSize } from "@/data/types";
import { Url } from '@/service';

type Rarity = EData.Rarity | EUnit.Rarity;
type IconKey = keyof typeof IconName;

const getIconBg = (rarity: Rarity) => {
  if (rarity in EData.Rarity) {
    return getIconItem(rarity as EData.Rarity);
  }
  return getIconFace(rarity as EUnit.Rarity);
};

const size: CanvasSize = [256, 256];
const coordinates: Coordinates = [
  [0, 0],
  [12, 12, 232, 232],
  [0, 0],
];

export const getUrl = async (id: number | string, iconKey: IconKey, rarity: Rarity) => {
  const iconValue = getIconBg(rarity);
  const iconUrls = [
    Url(iconValue.bg),
    Url(getIcon[iconKey](id)),
    Url(iconValue.frame)
  ];
  return drawIconsToURL({ iconUrls, size, coordinates, key: id });
};