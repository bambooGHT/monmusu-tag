import router from "@/router";

export const getPath = (id: number | string | undefined, category: UNIT.UnitType) => {
  if (category === "token") id = `token${id}`;
  return id;
};

export const toUnit = (e: MouseEvent, id: number | string | undefined, category: UNIT.UnitType) => {
  if (!id) {
    e.preventDefault();
    return;
  }
  if (guardEvent(e)) {
    router.push("unit", getPath(id, category));
  }
};

const guardEvent = (e: MouseEvent) => {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  return true;
};