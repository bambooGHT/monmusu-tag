type GetIdAndTalentAttributeName = {
  attributeName: ABILITIES.AttributeNames | undefined;
  id: number;
  count: 5 | 3 | 1 | 2;
};
const { talentRelationKey1, talentRelationKey2 } = EAbilities;

class GetTalentCalculateCategory {
  static getCalculateIndex(talentId: number) {
    if (talentId < 40) {
      return 5;
    }
    else if (talentId < 61) {
      return 3;
    }
    else if (talentId < 67) {
      return 2;
    }
    else {
      return 1;
    }
  }

  static getIdAndTalentAttributeName(talentId: number): GetIdAndTalentAttributeName {
    let id, attributeName;
    const count = this.getCalculateIndex(talentId);
    const rangeObj = {
      5: () => {
        return talentRelationKey1[~~(talentId / count)];
      },
      3: () => {
        talentId -= 40;
        return talentRelationKey2[~~(talentId / count)];
      },
      2: () => {
        if (talentId === 61 || talentId === 62) return talentRelationKey2[7];
        if (talentId === 65 || talentId === 66) return talentRelationKey2[8];
      },
      1: () => {
        if (talentId === 78) return talentRelationKey2[9];
        if (talentId === 82) return talentRelationKey2[10];
      }
    };

    attributeName = rangeObj[count]();
    id = talentId % count;

    return { id, attributeName, count } as GetIdAndTalentAttributeName;
  }
}

export default GetTalentCalculateCategory;