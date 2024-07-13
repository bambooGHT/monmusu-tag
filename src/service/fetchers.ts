import { service } from "./service";
import type { AxiosProgressEvent } from "axios";
import type {
  News, AttachObtainWays, SearchParams, SearchResult, UnitOriginalAbilitiesDataParams,
  Gallery, GalleryData, Announce, unitList, UnitOriginalAbilitiesData,
  JobData, TokenData, EquipmentData, QuestData, levelDetailedDataParams,
  QuestCategory, levelDetailedData, UnitSpineResource
} from "./types";

export type fetchers = typeof fetchers;
export type Key = keyof fetchers;

export const fetchers = {
  /** 插件 */
  "attach": () => service.get<DATA.Attach[]>("/attach"),
  "attachObtainWays": () => service.get<AttachObtainWays>("/attachObtainWays"),
  /** 搜索 */
  "unitSearch": (params: SearchParams) => service.get<SearchResult>("/unitSearch", { params }),
  /** 道具数据 */
  "walletData": () => service.get<ObjIndex<DATA.Wallet>>("/walletData"),
  "itemTemplateData": () => service.get<ObjIndex<DATA.ItemTemplate>>("/itemTemplateData"),
  /** 武器种数据 */
  "jobData": () => service.get<JobData>("/jobData"),
  /** token数据 */
  "tokenData": () => service.get<TokenData>("/tokenData"),
  /** 角色觉醒能力数据 */
  "unitAwakenings": () => service.get<ObjIndex<UNIT.Awakenings>>("/unitAwakenings"),
  /** 角色等级经验数据 */
  "unitLevelExps": () => service.get<DATA.UnitLevelExps>("/unitLevelExps"),

  "equipmentData": () => service.get<EquipmentData>("/equipmentData"),

  "skinData": () => service.get<DATA.Skin[]>("/skinData"),
  /** 单位数据 */
  "unitList": (status: UNIT.UnitType) => service.get<unitList>(`/unitList/${status}`),
  /** 单位语音跟json */
  "unitVoice": (id: number) => service.get<UNIT.VoiceData>(`/unitVoice/${id}`,),
  "unitSpineResource": (params: { id: number, key?: string; }) => service.get<UnitSpineResource>(`/unitSpineResource`, { params }),
  /** 单位能力数据 */
  "unitAbilities": (params: UnitOriginalAbilitiesDataParams): Promise<UnitOriginalAbilitiesData> => {
    return service.request<UnitOriginalAbilitiesData>({ url: `/unitAbilities`, params });
  },
  /** 章节数据 */
  "questData": (id: number) => service.get<QuestData>(`/questData`, { params: { id } }),
  "questCategory": (category: keyof QuestCategory) => service.get<QuestCategory>(`/questCategory/${category}`),

  "weatherEffect": () => service.get<ObjIndex<DATA.WeatherEffect>>("/weatherEffect"),

  "levelDetailedData": (params: levelDetailedDataParams) => service.get<levelDetailedData>(`/levelDetailedData`, { params }),

  "advStorySettingData": () => service.get<STORY.SettingData>(`/advStorySettingData`),
  /** 图片加载进度 */
  "imgProgressUrl": async (url: string, onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    const data = await service.request<string>({
      url,
      method: "GET",
      responseType: "arraybuffer",
      onDownloadProgress
    });

    const blob = new Blob([data], { type: "image/png" });
    return URL.createObjectURL(blob);
  },
};

export type fetchers2 = typeof fetchers2;
export type Key2 = keyof fetchers2;

export const fetchers2 = {
  /** 更新信息 */
  "news": () => service.get<News[]>("/news"),
  /** 随机推特图 */
  "galleryRandom": () => service.get<Gallery>('/galleryRandom'),
  /** 画廊 */
  "gallery": () => service.get<GalleryData>("/gallery"),
  /** 更新信息图片 轮播图 */
  "announceImages": () => service.get<Announce[]>('/announceImages'),

  "picturebooks": () => service.get<ObjIndex<DATA.Picturebook>>("/picturebooks"),
  /** 特性额外描述文本 */
  "featureExpandDescribeText": () => service.get<ObjIndex<DATA.FeatureExpandDescribeText>>("/featureExpandDescribeText"),
};