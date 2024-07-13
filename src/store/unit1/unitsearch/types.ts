export type SearchResultData = {
  list: {
    character: UNIT.Character;
    skill?: SkillData;
    raceFeature?: {
      name: string,
      text: string;
    };
  }[],
  excludeCount: number;
};

export type SkillData = {
  name: string[];
  text: string[];
  index: number;
  toggleIndex?: (value: "prev" | "next") => void;
};