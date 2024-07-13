export const getUnitType = (id: number | string): UNIT.UnitType => {
  if (isNaN(+id)) {
    return "token";
  }
  id = +id;
  if (id < 9000) {
    return "character";
  }
  if (id < 50000) {
    return "beastGod";
  }
  return "enemy";
};