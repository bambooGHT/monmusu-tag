import { gender, hitType, moveType, unitRarity, attr } from '@/store/unit1/unitData/basicData';
import { unitDetailData } from '@/store/unit1/unitData';
import { getIcon, getIconRarity } from '@/data/iconSrc';
import unitfilters from "@/assets/unitFilters.json";
type InfoList = {
  title: string;
  text?: string;
  img?: string;
  imgText?: string;
}[];

const getInfoList = () => {
  const { unit, tribe, job } = unitDetailData;

  const infoType: ObjIndex<() => InfoList> = {
    "character": () => {
      const { unit, jobFeature } = unitDetailData;
      return [
        {
          title: 'rarity',
          img: getIconRarity(unit.rarityId),
          imgText: unitRarity[unit.rarityId].name,
        },
        {
          title: 'job',
          img: getIcon.job(unit.classId),
          imgText: jobFeature.names[0],
        },
        {
          title: 'attr',
          text: unit.nickname,
          img: getIcon.attr(unit.element),
          imgText: attr[unit.element]
        }
      ];
    }
  };
  const info: InfoList = [
    {
      title: 'nickname',
      text: unit.nickname || (<any>unit).name || "なし"
    },
    {
      title: 'charaName',
      text: unit.charaName
    },
    {
      title: 'gender',
      text: gender[unit.gender]
    },
  ];
  const traitList = Object.fromEntries(unitfilters.trait.map(p => [p.id, p.name]));
  const trait = unit.trait_id_array?.map(p => traitList[p]).join("&");

  trait && info.push({ title: "trait", text: trait });
  infoType[unitDetailData.unitType] && info.push(...infoType[unitDetailData.unitType]());
  unitDetailData.unitType !== "character" && info.push({
    title: 'tribe',
    text: tribe.tribe
  });
  !["enemy", "beastGod"].includes(unitDetailData.unitType) && info.push({
    title: 'summon',
    img: getIcon.summon(job[0].summonType)
  });
  unitDetailData.unitType !== "beastGod" && info.push(
    {
      title: 'move',
      text: moveType[unit.receiveType || unit.moveType]
    },
    {
      title: 'hitType',
      text: hitType[job?.[0].hitType || unit.hitType]
    }
  );

  return info;
};

export default getInfoList;