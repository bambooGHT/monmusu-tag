import type { CanvasSize, Coordinates, Face } from "@/data/types";
import { getIconFace, getIcon, drawIconsToURL } from "@/data";
import { Url } from "@/service";

export type unitType = {
  id?: number;
  resource: number;
  attr: EUnit.Attr | string;
  rarity: EUnit.Rarity;
} & Job;

type Job = CharacterJob | noJob;

type CharacterJob = {
  job: string | number;
  category: "character";
};

type noJob = {
  job?: string | number;
  category?: Exclude<UNIT.UnitType, 'character'>;
};

const iconIndex: Record<UNIT.UnitType, keyof Face> = {
  character: "unit",
  token: "beastGod",
  enemy: "frame",
  beastGod: "beastGod"
};

const arr: ["unit" | "unit_s", (keyof Face)][] = [["unit_s", "bg"], ["unit", "unitbg"]];

const getIcons = (data: unitType) => {
  const category = data.category!;
  const value = arr[category === "enemy" ? 0 : 1];
  const result = [
    Url(getIconFace(EUnit.Rarity.R)[value[1]]),
    Url(getIcon[value[0]](data.resource)),
    Url(getIconFace(data.rarity)[iconIndex[category]]),
  ];
  if (["token", "character"].includes(category)) result.push(Url(getIcon.attr(data.attr)));
  if (category === "character") result.push(Url(getIcon.job(data.job!)));

  return result;
};

type CoordinatesAndSize = {
  size: CanvasSize;
  coordinates: Coordinates;
};

const unitCoordinates: CoordinatesAndSize = {
  size: [284, 228],
  coordinates: [
    [0, 0],
    [28, 18, 242, 194],
    [0, 0],
    [215, 9.5],
    [20.5, 9, 59, 59]
  ]
};
const enemyCoordinates: CoordinatesAndSize = {
  size: [256, 256],
  coordinates: [
    [0, 0],
    [12, 12, 232, 232],
    [0, 0]
  ]
};

export const getUrl = async (data: unitType) => {
  const key = `${data.resource}_${data.category!}`;
  const iconUrls = getIcons(data);
  const { size, coordinates } = data.category === "enemy" ? enemyCoordinates : unitCoordinates;

  return drawIconsToURL({ iconUrls, size, coordinates, key: key });
};