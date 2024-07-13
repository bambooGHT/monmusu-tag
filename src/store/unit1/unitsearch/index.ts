import { ref } from "vue";
import { useSWRAsync } from "@/service";
import processSearchResult from "./processSearchResult";
import { message } from "@/message";
import createLinkedList from "../unitData/initUnit/createLinkedList";
import type { SearchResultData, SkillData } from "./types";
import type { SearchParams } from "@/service/types";

const searchTextReplace = (str: string) => {
  str = str.replace(/[0-9a-zA-Z\s`~!@#$%&^*()_+?:{}./;·！#￥（——）：；“”‘、，《。》？、【】\[\]]/g, '');
  return str;
};

const paramsExamine = (value: string[]) => {
  return value.map((str) => {
    if (str.replace(/(,|\|)/g, '')[0]) return true;
    return false;
  }).includes(true);
};

const createSkillToggleIndex = (skill: SkillData) => {
  let linkList = createLinkedList(0, skill.text.length - 1).get(0)!;
  const updateIndex = (value: "prev" | "next") => {
    linkList = linkList[value];
    skill.index = linkList.data;
  };
  skill.toggleIndex = updateIndex;
};

const resetSrarchResult = () => {
  const { resultList } = unitSearch;
  resultList.value.list = [];
  resultList.value.excludeCount = 0;
};

export const unitSearch = {
  resultList: ref<SearchResultData>({
    list: [],
    excludeCount: 0
  }),
  isSearching: ref(false),

  toSearch: async (searchParams: SearchParams) => {
    const { isSearching, resultList } = unitSearch;
    if (isSearching.value) return;
    isSearching.value = true;
    resetSrarchResult();

    const skill = searchTextReplace(searchParams.skill);
    const raceFeature = searchTextReplace(searchParams.raceFeature);

    if (!paramsExamine([skill, raceFeature])) {
      message.add({ type: "error", message: "text parameter format error !" });
      return;
    }

    const searchResult = await useSWRAsync("unitSearch", false, { skill, raceFeature });
    if (searchResult.raceFeatures.length || searchResult.skills.length) {
      const data = await processSearchResult(searchResult, searchParams);
      resultList.value = data;
      data.list[0].skill && resultList.value.list.forEach(({ skill }) => {
        if (skill!.name.length > 1) {
          createSkillToggleIndex(skill!);
        }
      });
    }

    isSearching.value = false;
  }
};

