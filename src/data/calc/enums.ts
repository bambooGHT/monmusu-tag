export enum awakeningState {
  notawaked,
  awaked,
}

export enum AttributeKeys {
  hp = "HP",
  attack = "ATK",
  defense = "DEF",
  mdefense = "MDEF",
}

export enum UniqueWeaponAttributeKeys {
  life = "HP",
  power = "ATK",
  defense = "DEF",
  magic_resist = "MDEF",
  range = "Range",
  attack_speed = "ASPD",
  attack_interval = "ACD"
}

export enum AttributeName {
  HP = "Health Points",
  ATK = "Attack",
  DEF = "Defense against Physical Attacks",
  MDEF = "Defense against Magical Attacks",
  Block = "Number of Enemies Blocked",
  Range = "Attack Range",
  ASPD = "Attack Speed",
  Targets = "Number of Targets Attacked",
  ACD = "Attack Cooldown",
  COST = "Cost",
  MC = "move cost",
  SPD = "Movement Speed",
  DoT = "Damage over Time",
  CRIT_RATE = "Critical Rate",
  CRIT_DAMAGE = "Critical Damage"
}

export enum ResistanceKey {
  stunResistance = 'stun',
  petrifactionResistance = "petrifaction",
  poisonResistance = "poison",
  blowOffResistance = "blowOff",
  knockBackResistance = "knockBack",
  burnResistance = "burn",
  scratchResistance = "scratch",
  frozenResistance = "frozen",
  baseStatusResistance = "baseStatus",
  moveSpeedResistance = "moveSpeed",
  attackSpeedResistance = "attackSpeed",
  attackIntervalResistance = "attackInterval"
}