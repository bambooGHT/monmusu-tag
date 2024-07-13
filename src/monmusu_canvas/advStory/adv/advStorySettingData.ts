type StorySettingType = typeof EStory.StorySettingType;
type StorySettingKeys = keyof StorySettingType;

export class AdvStorySettingData {
  readonly #settingData: STORY.AdvSettingData;
  get settingDataList() {
    return this.#settingData;
  }

  constructor(settingData: STORY.AdvSettingData) {
    this.#settingData = settingData;
  }

  getSettingData<T extends StorySettingKeys>(type: T): STORY.AdvSettingData[StorySettingType[T]] {
    return this.#settingData[EStory.StorySettingType[type]];
  }

  getSettingValue<T extends StorySettingKeys, K extends keyof STORY.AdvSettingData[StorySettingType[T]]>(type: T, key: string): STORY.AdvSettingData[StorySettingType[T]][K] {
    return this.#settingData[EStory.StorySettingType[type]][key] as any;
  }
}