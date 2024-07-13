import { AdvCommandFactory } from "./advCommand/advCommandFactory";
import { ResourcePreload, ResourceType, type ResourceData } from "../resourcePreload";

export class AdvStoryManage {
  /** 当前故事数据 */
  private storyData!: STORY.AdvScriptRow[];
  private currentIndex = 0;

  private resourcePreload = new ResourcePreload(7, 5);


  async updateStory(storyData: STORY.AdvScriptData) {
    if (storyData.scriptList.length > 1) {
      new Error("Story list length is greater than 2");
    }

    const scriptRows = storyData.scriptList[0].scriptRows.slice(33);
    this.storyData = scriptRows;
    this.currentIndex = 0;

    // 处理需要加载的资源
    const resources = this.#processResourceData();
    await this.resourcePreload.updateResource(resources);
  }

  async next() {
    const { storyData } = this;
    const currentRow = storyData[this.currentIndex++];
    const commandParams = currentRow.commandParams;
    this.resourcePreload.nextPreload(currentRow.rowIndex);

    const command = AdvCommandFactory.createCommand(commandParams.Command);
    const wait1 = command.execute(commandParams);
    let wait2;
    let wait3;

    if (commandParams.Voice) {
      const commandVoice = AdvCommandFactory.createCommand("Voice");
      wait2 = commandVoice.execute(commandParams);
    }

    if (EStory.CommandBase[commandParams.Command] === "CommandText" && commandParams.Arg1) {
      const commandCharacter = AdvCommandFactory.createCommand("Character");
      wait3 = commandCharacter.execute(commandParams);
    }

    console.log("end", commandParams);
    if (commandParams.WaitType !== "NoWait") {
      await Promise.all([wait1, wait2, wait3]);
    }

    if (currentRow.rowIndex >= 57) {
      return;
    }

    this.next();
  }

  prev() {

  }

  #processResourceData() {
    const storyData = this.storyData;
    const settingData = AdvGlobal.advStorySettingData.settingDataList;
    const resourceData: ResourceData[] = [];

    for (const { commandParams: p, rowIndex } of storyData) {
      const command = p.Command as keyof typeof ResourceType;
      const type = ResourceType[command];
      const value: ResourceData = { rowIndex, type };

      if (type) {
        const data = settingData[type][p.Arg1];
        data && (value.file = data.FileName);
      }

      if (p.Voice) {
        value.voice = p.Voice;
      }

      if (Object.keys(value).length > 2) {
        resourceData.push(value);
      }
    }

    return resourceData;
  }
}