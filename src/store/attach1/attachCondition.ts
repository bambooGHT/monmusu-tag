import { useSWRAsync } from "@/service";

type ActiveData = ABILITIES.TalentList[0]["activeData"][0];
type ConditionFun = (data: DATA.Job[], value: number, key: keyof DATA.Job) => DATA.Job[];
type AttachConditionFilter = {
  type: number,
  filterFunc: (activeData: ActiveData, character: UNIT.Character[]) => Promise<UNIT.Character[]>;
};

const condition: Record<ABILITIES.ActiveOption, ConditionFun> = {
  "": (data, value, key) => data.filter(p => p[key] === value),
  "!": (data, value, key) => data.filter(p => p[key] !== value),
  ">=": (data, value, key) => data.filter(p => (<number>p[key]) >= value),
  "<=": (data, value, key) => data.filter(p => (<number>p[key]) <= value)
};

const getJobs = async () => {
  const { job } = await useSWRAsync("jobData");
  let jobs = Object.values(job);
  jobs = jobs.slice(0, jobs.findIndex((p) => p.id > 50000));
  return jobs;
};

const characterFilterFunc = async (activeData: ActiveData, characters: UNIT.Character[], key: keyof DATA.Job) => {
  const jobs = await getJobs();
  const filterJobs = condition[activeData.option[0] as ABILITIES.ActiveOption](jobs, activeData.value[0], key);
  const ids = new Set(filterJobs.map(p => p.id));

  return characters.reduce((result: UNIT.Character[], value) => {
    if (ids.has(value.classId)) {
      result.push(value);
    }
    return result;
  }, []);
};


export const attachConditionFilter: AttachConditionFilter[] = [
  {
    type: 1002,
    filterFunc: async (activeData, characters) => {
      return characters.filter((p) => p.element === activeData.value[0]);
    }
  },
  {
    type: 1006,
    filterFunc: async (activeData, characters) => {
      return await characterFilterFunc(activeData, characters, "system_id");
    }
  },
  {
    type: 1007,
    filterFunc: async (activeData, characters) => {
      return await characterFilterFunc(activeData, characters, "id");
    }
  }
];