<template>
  <section class="abilities abilities-template">
    <div class="abilities-left abilities-box" :class="{ 'abilities-box-content': infoIndex === 10 }">
      <div class="info-template">
        <skeleton class="info" v-for="index of infoIndex" animation></skeleton>
      </div>
      <div class="unit-awakening" v-if="infoIndex === 10">
        <skeleton class="text-title" style="width: 55px;" animation></skeleton>
        <div v-for="index of 5" class="awakening-list">
          <skeleton class="awakening-item" animation></skeleton>
        </div>
        <skeleton class="text-title" style="width: 100px;" animation></skeleton>
        <skeleton class="text-title" style="width: 130px;" animation></skeleton>
      </div>
      <div class="associationId" v-if="infoIndex === 6">
        <skeleton animation></skeleton>
        <skeleton animation></skeleton>
        <skeleton animation></skeleton>
      </div>
    </div>

    <div class="abilities-right abilities-box">
      <div class="unit-level-exp" v-if="infoIndex === 10">
        <skeleton style=" width: 45px;height: auto;" animation></skeleton>
        <ul>
          <li v-for="index of 3">
            <skeleton class="icon" animation></skeleton>
            <skeleton class="value" animation></skeleton>
          </li>
        </ul>
      </div>
      <div class="ability-map" v-if="infoIndex === 6">
        <skeleton style="width: 50px;" animation></skeleton>
        <skeleton style="width: 150px;" animation></skeleton>
        <skeleton style="width: 200px;" animation></skeleton>
      </div>
      <div style="display: flex; justify-content: center; align-items: center;"
        v-if="infoIndex === 7 || infoIndex === 10">
        <skeleton animation style="margin:0 0 2px; width: 41px; height: 21px;"></skeleton>
        <skeleton style="margin:0 5px 0 20px; width:70%; height: 15px;" animation>
        </skeleton>
      </div>
      <ul class="unit-class-and-eq" v-if="infoIndex === 10">
        <li v-for="index of 5">
          <skeleton animation></skeleton>
        </li>
      </ul>
      <ul class="ability-attr" v-if="infoIndex !== 4">
        <li v-for="index of unitDetailData.unitType === 'enemy' ? 9 : 14">
          <skeleton class="ability-key" animation></skeleton>
        </li>
      </ul>
      <div class="uniqueWeapon" v-if="infoIndex === 10">
        <div>
          <skeleton style="width: 80px;height: 70px;"></skeleton>
          <skeleton style=" margin: 2px auto 0;width: 80px;"></skeleton>
        </div>
        <div class="uniqueWeapon-info" style=" width: 60%;">
          <skeleton animation></skeleton>
          <skeleton animation></skeleton>
        </div>
      </div>
      <ul class="token-data" v-if="infoIndex === 7">
        <li v-for="index of 4">
          <skeleton animation></skeleton>
        </li>
      </ul>
      <template v-if="infoIndex === 6">
        <skeleton style="margin: 4px auto;width: 90px;" class="text-title" animation></skeleton>
        <ul class="ability-attr ability-attr2">
          <li v-for="index of 9">
            <skeleton class="ability-key" animation></skeleton>
          </li>
        </ul>
      </template>
      <ul class="abilites-text">
        <li>
          <skeleton class="text-title" style="width: 170px;" animation></skeleton>
          <skeleton v-if="infoIndex === 4" class="text-title" style="width: 55px;" animation>
          </skeleton>
          <div class="text">
            <skeleton animation></skeleton>
          </div>
        </li>
        <li v-if="infoIndex !== 6">
          <skeleton class="text-title" style="width: 170px;" animation></skeleton>
          <skeleton class="text-title" style="width: 55px;" animation></skeleton>
          <div class="text">
            <skeleton animation></skeleton>
          </div>
          <skeleton class="text2" animation style="width: 40%;"></skeleton>
          <skeleton class="text2" v-if="infoIndex === 4" animation style="width: 55%;"></skeleton>
        </li>
        <li v-if="infoIndex === 10">
          <skeleton class="text-title" style="width: 170px;" animation></skeleton>
          <div class="text">
            <skeleton animation></skeleton>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { unitDetailData } from '@/store/unit1/unitData';
import skeleton from '@/views/components/skeleton';
import { computed } from 'vue';

const attrCount: Record<UNIT.UnitType, number> = {
  "character": 10,
  "enemy": 6,
  "token": 7,
  "beastGod": 4,
};

const infoIndex = computed(() => {
  return attrCount[unitDetailData.unitType];
});
</script>

<style lang="scss" scoped>
@import "./unit-abilities.scss";
@import "./abilitiesLeftComponents/awakenings/unit-abilities-awakenings.scss";
@import "./abilitiesRightComponents/attributes/unit-abilities-attributes.scss";
@import "./abilitiesRightComponents/text/unit-abilities-text.scss";
@import "./abilitiesRightComponents/tokenData/unit-abilities-tokenData.scss";
@import "./abilitiesRightComponents/mapAttrRevision/unit-map-attrRevision.scss";
@import "./abilitiesRightComponents/level/unit-abilities-level.scss";
@import "./abilitiesRightComponents/classAndEquipment/unit-abilities-classAndEquipment.scss";
@import "./abilitiesRightComponents/uniqueWeapon/unit-abilities-uniqueWeapon.scss";

.abilities-template {
  font-size: clamp(1.25rem, 1.3vw, 1.45rem);

  .info-template {
    .info {
      margin: 2px 0 6px;
      border-bottom: 2px solid transparent;
      height: calc(clamp(30px, 3.1vw, 34px) - 6px);
    }

    @media (width <=860px) {
      display: flex;
      flex-wrap: wrap;
      width: 99%;

      .info {
        width: 33%;
        height: 35px;
      }
    }

    @media (width <=575px) {
      .info {
        width: 50%;
      }
    }
  }

  .text-title {
    height: auto;
  }

  .unit-awakening {
    margin-top: 8px;
    border-color: var(--skeleton-color);

    .text-title {
      margin: 1.5px auto 5px;
      height: auto;
      line-height: 1.7;
    }


    .awakening-list {
      display: flex;
      justify-content: space-around;

      .awakening-item {
        margin: 2.5px 0;
        line-height: calc(clamp(28.5px, 3vw, 30px) - 6px);
      }
    }
  }

  .associationId {
    display: flex;

    div {
      margin: 5px;
      width: calc(33.33% - 10px);
      height: 32px;
    }
  }

  .ability-attr li {
    margin: 0 5px 5px;
    height: 25px;
  }

  .abilites-text li {
    border-color: var(--skeleton-color);

    > div {
      margin: 2px auto;
      width: 90%;
      font-size: clamp(1.23rem, 1.55vw, 1.7rem);
    }

    .text {
      margin: 2px auto;
      min-height: calc(clamp(40px, 4.2vw, 48px) - 5px);
    }

    .text,
    .text2 {
      margin: 3px auto 0;
      font-size: clamp(1.25rem, 1.3vw, 1.45rem);
    }
  }

  .token-data {
    margin: 0 auto 5px;

    li {
      margin: 0 5px;
      width: calc(20% - 10px);
      @media (width <=575px) {
        margin: 0 5px 2px;
        width: calc(50% - 10px);
        height: 26px;
      }
    }
  }

  .ability-map div {
    margin: 3px auto 2px;
    padding: 2px 0 0;
    height: auto;
    @media (width <=575px) {
      padding: 2.0px 0;
    }
  }

  .unit-class-and-eq li div {
    margin-bottom: 3px;
    width: 78px;
    height: 57px;
  }

  .uniqueWeapon {
    margin: 0 0 3.5px;
  }

  .uniqueWeapon-info {
    div {
      margin: 3px 5px 0;
      padding: 0;
    }
  }

  .unit-level-exp {
    .icon {
      width: 50px;
      height: 48px;
    }

    .value {
      margin: 2px 0;
      height: auto;
      font-size: 1.2rem;
    }
  }
}
</style>