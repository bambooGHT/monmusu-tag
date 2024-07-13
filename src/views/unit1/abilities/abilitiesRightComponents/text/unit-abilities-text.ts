import { useSWR } from "@/service";
import { unitDetailData, unitAbilitiesData, unitAbilitiesHandler } from "@/store/unit1/unitData";
import createLinkedList from "@/store/unit1/unitData/initUnit/createLinkedList";
import { computed, ref, type ComputedRef } from "vue";
import type { DCLLNode } from "@/utils/linkedList/types";
import type { AbilityText } from "@/data/calc/abilitiesTextProcessor/types";


type updateFunc = (value: "prev" | "next") => void;

type AbilitiesTextData = {
  name: string;
  text: AbilityText;
  levelIndex?: number;
  indexUpdate?: updateFunc;
  levelUpdate?: updateFunc | undefined;
  abilitiesText?: string[][];
};

type TextDataFunc = () => ComputedRef<AbilitiesTextData | undefined> | undefined;

const { SKILL_LEVEL, SKILL_INDEX, ABILITY_INDEX, ABILITY_LEVEL, BEASTGOD_SKILL_LEVEL } = EUnit;

const textUpdate = () => {
  const { raceFeature } = unitAbilitiesData;

  const updateList: ReturnType<TextDataFunc>[] = [
    raceFeature ? computed(() => {
      return {
        name: `raceFeature: ${raceFeature.name}`,
        text: raceFeature.text
      };
    }) : undefined,
    _ability(),
    _skill(),
    ..._jobFeature(),
    _raceFeatureExpandDescribeText(),
    _tip()
  ];

  return updateList;
};

const _ability: TextDataFunc = () => {
  const { abilityList } = unitAbilitiesData;
  if (!abilityList) return undefined;

  let abilityIndex = createLinkedList(ABILITY_INDEX.MIN, ABILITY_INDEX.MAX).get(0)!;
  let levelUpdate: updateFunc | undefined = undefined;

  const indexUpdate: updateFunc = (value) => {
    abilityIndex = abilityIndex[value];
    unitAbilitiesHandler.updateAbility(abilityIndex.data, abilityList.level);
  };

  if (abilityList.level !== undefined) {
    let currentIndex = -1;
    let abilityLevel: DCLLNode<number>;

    levelUpdate = (value) => {
      if (currentIndex !== abilityIndex.data) {
        currentIndex = abilityIndex.data;
        abilityLevel = createLinkedList(ABILITY_LEVEL.MIN, ABILITY_LEVEL.MAX).get(0)!;
      }
      abilityLevel = abilityLevel[value];
      unitAbilitiesHandler.updateAbility(abilityList.index, abilityLevel.data);
    };
  }

  return computed(() => {
    return {
      name: `ability${abilityList.index + 1}: ${abilityList.name[abilityList.index] ?? "null"}`,
      text: abilityList.text,
      levelIndex: abilityList.level + 1,
      indexUpdate,
      levelUpdate
    };
  });
};

const _skill: TextDataFunc = () => {
  const { skill, recoverCost } = unitAbilitiesData;

  if (!skill) return;
  let skillIndex = createLinkedList(SKILL_INDEX.MIN, SKILL_INDEX.MAX).get(0)!;
  let levelUpdate: updateFunc | undefined = undefined;

  const indexUpdate: updateFunc = (value) => {
    skillIndex = skillIndex[value];
    unitAbilitiesHandler.updateSkill(skillIndex.data, skill.level);
  };

  if (skill.level !== undefined) {
    let currentIndex = -1;
    let skillLevel: DCLLNode<number>;
    const { MAX, MIN } = unitDetailData.unitType === "beastGod" ? BEASTGOD_SKILL_LEVEL : SKILL_LEVEL;
    levelUpdate = (value) => {
      if (currentIndex !== skillIndex.data) {
        currentIndex = skillIndex.data;
        skillLevel = createLinkedList(MIN, MAX).get(0)!;
      }

      skillLevel = skillLevel[value];
      unitAbilitiesHandler.updateSkill(skill.index, skillLevel.data);
    };
  }

  return computed(() => {
    const result = {
      name: `skill${skill.index + 1}: ${skill.name[skill.index] ?? "null"}`,
      text: skill.text,
      levelIndex: skill.level + 1,
      indexUpdate,
      levelUpdate,
      abilitiesText: [
        [`coolTime: ${skill.time.cool} s`, `firstCoolTime: ${skill.time.first} s`]
      ]
    };

    if (recoverCost) {
      result.abilitiesText.push([
        `recoverCost: ${skill.name[skill.index] ? recoverCost.value : 0} * frequency`,
        `maxRecoverCost: ${skill.name[skill.index] ? recoverCost.maxValue : 0}`
      ]);
    }

    return result;
  });
};

const _jobFeature = () => {
  const result: ReturnType<TextDataFunc>[] = [];
  const { jobFeature } = unitAbilitiesData;

  if (jobFeature) result.push(computed(() => {
    return {
      name: `jobFeature: ${jobFeature.name[unitAbilitiesData.classIndex]}`,
      text: jobFeature.text
    };
  }));

  result.push(computed(() => {
    const featureExpandDescribeText = useSWR("featureExpandDescribeText");
    const raceExpandData = getFeatureExpandDescribeText(jobFeature?.text.join(""), featureExpandDescribeText.value);
    return raceExpandData;
  }));

  return result;
};

const _raceFeatureExpandDescribeText: TextDataFunc = () => {
  const { raceFeature } = unitAbilitiesData;
  return computed(() => {
    const featureExpandDescribeText = useSWR("featureExpandDescribeText");
    const raceExpandData = getFeatureExpandDescribeText(raceFeature?.text.join(""), featureExpandDescribeText.value);
    return raceExpandData;
  });
};

const _tip: TextDataFunc = () => {
  const { help } = unitAbilitiesData;
  if (!help?.body) return;

  return computed(() => {
    return {
      name: "",
      text: help.body.filter(p => !p.includes("png"))
    };
  });
};

const getFeatureExpandDescribeText = (raceText: string, raceExpandTextList: ObjIndex<DATA.FeatureExpandDescribeText>) => {
  if (!raceText || !raceExpandTextList) return undefined;
  const [value] = raceText.match(/(?<=link\=").*?(?=">)/) || [];
  if (!value) return undefined;

  const raceExpand = raceExpandTextList[value];

  return {
    name: "expandText: " + raceExpand.id,
    text: [raceExpand.text]
  };
};

export default textUpdate;