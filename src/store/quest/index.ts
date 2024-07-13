import type { Quest } from "./types";
import { reactive } from "vue";
import { LevelMapControl } from "@/monmusu_canvas/levelMap";

export * from "./questControl";
export const questData = reactive({} as Quest);
export const levelMap = new LevelMapControl();