import { app } from ".";
import { AdvStoryManage } from "./adv/advStoryManage";
import list from "./storyTest.json";
import { Story } from "./views/story/story";

const adv = new AdvStoryManage();

export const test = () => {
  const story = new Story();
  app.addChild(story.view);
  adv.updateStory(list as any);

  document.body.onclick = () => {
    adv.next();
  };
};