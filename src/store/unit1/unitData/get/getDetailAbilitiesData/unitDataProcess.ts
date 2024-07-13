import { useSWRAsync } from "@/service";

type AbilityList = (ABILITIES.Ability | UNIT.Skill)[];

type AbilityListReturnType<T extends AbilityList> = {
  list: T;
  names: string[];
};

class AbilitiesDataProcess {
  static async JobData(ClassId: number) {
    const jobValue = [],
      features: UNIT.RaceFeature[] = [],
      featureNames: string[] = [];

    const { job, jobFeatures } = await useSWRAsync("jobData");
    for (let i = 0; i < 5; i++) {
      jobValue.push(job[ClassId + i]);

      const JobFeature = jobFeatures[ClassId + i];
      features.push(JobFeature);
      featureNames.push(JobFeature.name);
    }
    return {
      value: jobValue, jobFeature: {
        list: features,
        names: featureNames
      }
    };
  }

  static async equipmentData(eqId: number): Promise<DATA.Equipment[][]> {
    const eq = [];

    for (let i = 0; i < 4; i++) {
      const { equipmentPattern, equipment } = await useSWRAsync("equipmentData");
      const eqIndexArr = equipmentPattern[eqId + i];
      const eqDataArr = eqIndexArr.map((p) => equipment[p]);
      eq.push(eqDataArr);
    }
    return eq;
  };

  static async awakeningsData(unit: UNIT.Character) {
    const result: UNIT.Awakenings[] = [],
      awakeningsValue: string[] = [];

    for (let i = 1; i <= 5; i++) {
      const awakenings = await useSWRAsync("unitAwakenings");
      const value = awakenings[unit[`awakingAbilityId${i}` as keyof UNIT.Character] as string];
      result.push(value);
      awakeningsValue.push(value.name);
    }

    return { list: result, value: awakeningsValue };
  }

  // static isAttributesUpdate(data: ABILITIES.Ability[]) {
  //   for (const [text, index] of data.map(p => p.text)) {
  //     for (const i of index) {
  //       if (isString(text[i][0]) && text[i].length > 1) return true;
  //     }
  //   }
  //   return false;
  // }

  static AbilityList<T extends AbilityList>(id: number, data: T): Unfold<AbilityListReturnType<T>> {
    const names = data.map((p) => p.name);
    return { list: data, names: names } as AbilityListReturnType<T>;
  }
}

export default AbilitiesDataProcess;