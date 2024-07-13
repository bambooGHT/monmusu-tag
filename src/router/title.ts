import { ref } from "vue";
/** 头部标题 */
const title = ref('NULL');
export default title;

export const updatePageMeta = (title: string, description: string = "") => {
  if (description.includes("<")) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    description = tempDiv.textContent || tempDiv.innerText || '';
  }

  document.title = title;
  ; (<HTMLMetaElement>document.querySelector('meta[name="description"]')).content =
    description || "ゲームの舞台となるのは、『モンスター娘』たちが暮らす絶海の孤島── その島に流れ着いた合法シ〇タの主人公は、失われた記憶を取り戻すため、個性豊かで可愛くエッチなモンスター娘たちと共に過ごすことに。謎を解明すべく島を巡ったり、イチャイチャしたり、上陸してきた人間の戦士や僧侶、騎士団などの敵と戦ったり捕えてXXXしたり、結局はモンスター娘とイチャイチャして過ごすハートフルな生活が待っています。";
};