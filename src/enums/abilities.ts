namespace EAbilities {
  // 触发时机
  export enum TriggerTiming {
    None,
    Passive,
    Attack,
    Block,
    Organize,
    Summon,
    Sortie,
    Evacuate,
    Dead,
    Lost,
    EntryPoint,
    Result,
    SkillStart,
    SkillFinish,
    PointLanding,
    PointJustLand,
    PointFirstJustLand,
    GetTreasure,
    BattleEvent,
    EarlyPassive,
    SummonMatchAtter,
    EvacuateSlaveNoDestroy,
    EvacuateSlaveDestroy,
    Status,
    PlayAttack,
    Destroy,
    ExternalSheetMax,
    Manual,
    CheckWeather
  }
  // 效果适用范围
  export enum RangeType {
    None = 0,
    Owner,
    FriendInRange,
    FriendAll,
    Guest,
    EnemyInRange,
    EnemyAll,
    OwnerToken,
    TokenInRange,
    TokenAll,
    Facility,
    FacilityAll,
    SamePoint,
    All,
    InRange,
    BossInRange,
    Max
  }

  export enum talentRelationKey1 {
    HP,
    ATK,
    DEF,
    MDEF,
    SPD,
    ASPD,
    ACD,
    Range,
  }

  export enum talentRelationKey2 {
    "?" = 1,
    Block,//44-46
    Targets,//47-49
    COST = 6,//59-60
    MC,//61-62
    DoT,//65-66
    CRIT_RATE,//78
    CRIT_DAMAGE,//82
  }
}

(<any>window).EAbilities = EAbilities;
