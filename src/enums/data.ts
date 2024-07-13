namespace EData {
  export enum Rarity {
    UNKNOWN = 1397969457,
    R = 17201,
    HR = 21041,
    SR = 5460529,
    SSR = 1397969457,
  }
  
  export enum BattleTalentId {
    state = 513,
    battleTokenMember = 1016,
    beastGodSkill = 1026,
    story = 1043,
    summonPointEffect = 1052,
    weather = 1061,
    start = 1062,
    enemyHelp = 1091,
    addChrarcter = 1095,
    // cost = 1096,
    addBeastGod = 1099
  }
}

(<any>window).EData = EData;
