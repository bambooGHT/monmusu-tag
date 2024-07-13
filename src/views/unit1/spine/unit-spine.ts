import { ref } from "vue";
import { monmusuSpine } from "@/store/unit1/unitData";

export const currentBackground = ref(monmusuSpine.unitSpineProgram.spineConfig.background === "black" ? true : false);