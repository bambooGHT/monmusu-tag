import { useSWRAsync } from "@/service";
import ClassAttributes from "@/data/calc/attributesProcessor/classAttributes";
import SkillTextProcess from "@/data/calc/abilitiesTextProcessor/skill";
import AbilityTextProcess from "@/data/calc/abilitiesTextProcessor/ability";
import type { SearchParams, SearchResult } from "@/service/types";
import type { CalcAbilitiesProps } from "@/data/calc/types";
import type { SkillData, SearchResultData } from "./types";

const processSearchResult = async (searchResult: SearchResult, searchParams: SearchParams) => {
  const { raceFeatures, skills } = searchResult;
  const searchResultIdList = (raceFeatures[0] ? raceFeatures : skills).map(p => {
    if (Array.isArray(p)) {
      return +String(p[0].id).slice(-4);
    }
    return p.id;
  });

  const getCharacterData = await initCharacters(raceFeatures, skills, searchParams);
  const result = searchResultIdList.reduce((data: SearchResultData, value, index) => {
    const characterData = getCharacterData(value, index);
    characterData ? data.list.push(characterData) : data.excludeCount += 1;
    return data;
  }, { list: [], excludeCount: 0 });

  return result;
};

const initCharacters = async (raceFeatures: ABILITIES.Ability[], skillList: SearchResult["skills"], searchParams: SearchParams) => {
  const characters = await useSWRAsync("unitList", true, "character");
  const { job } = await useSWRAsync("jobData");

  const props = { FPS: EMap.MapBase.FPS } as CalcAbilitiesProps;
  const raceFeatureText = raceFeatures[0] ? new AbilityTextProcess({ list: raceFeatures, props }) : undefined;
  let skillText = undefined;
  let idAssocSkillIndexs = undefined;
  if (skillList[0]) {
    const { list, assocIndex } = processSkillListAssocIndex(skillList);
    idAssocSkillIndexs = assocIndex;
    skillList = list;
    skillText = new SkillTextProcess({
      list: list,
      maxLevel: EUnit.SKILL_LEVEL.MAX,
      interpolationTime: 0,
      props
    });
  };

  const skillTextReplace = searchTextHighlightReplace(searchParams.skill);
  const raceFeatureTextReplace = searchTextHighlightReplace(searchParams.raceFeature);

  return (id: number, index: number) => {
    const character = characters[id];
    if (!character) return undefined;

    props.attributes = new ClassAttributes({
      unit: character,
      jobs: [job[character.classId]],
      classLevelCoefficient: EUnit.CLASS_COEFFICIENT.CHARACTER
    }).getAttributes(1);

    const raceFeature = raceFeatureText && {
      name: raceFeatures[index].name,
      text: raceFeatureTextReplace(raceFeatureText.getValue(index).join(""))
    };

    const skill = skillText && idAssocSkillIndexs![id].reduce((result: SkillData, i) => {
      result.name.push((<UNIT.Skill[]>skillList)[i].name);
      const { text } = skillText.getValue(i, 0);
      result.text.push(skillTextReplace(text.join("")));
      return result;
    }, { name: [], text: [], index: 0 });

    return { character, raceFeature, skill };
  };
};

const processSkillListAssocIndex = (skillList: SearchResult["skills"]) => {
  let index = 0;
  return skillList.reduce((result: { list: UNIT.Skill[], assocIndex: ObjIndex<number[]>; }, value) => {
    const skills = Array.isArray(value) ? value : [value];
    const id = +String(skills[0].id).slice(-4);
    const currentAssocIndex = result.assocIndex[id] = [] as number[];

    skills.forEach(p => {
      result.list.push(p);
      currentAssocIndex.push(index++);
    });

    return result;
  }, { list: [], assocIndex: {} });
};

const searchTextHighlightReplace = (text: string) => {
  const reg = new RegExp(`(${text.split("|")[0].split(",").filter(p => p).join("|")})`, "g");
  return (str: string) => {
    return str.replace(/(?<=link).*?(?=>)/, "").replace(reg, "<mark class=\"highlight-color\">$1</mark>");
  };
};

export default processSearchResult;