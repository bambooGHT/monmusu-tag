<template>
  <section v-if="enemyList">
    <ul class="level-enemy">
      <li v-for="{ unit, count } of enemyList" :title="unit.text || unit.charaName" :key="unit.id"
        @click="questControl.updateCurrentEnemy({ unit, count })" @dblclick="$router.push(`/unit/${unit.id}`)">
        <unitFace class="level-enemy-min" :class="{ selected: currentEnemyInfo?.unit === unit }"
          :resource="unit.resource" :attr="unit.element" :rarity="82" :category="'enemy'">
          <p>{{ unit.charaName }}</p>
          <p>count *{{ count }}</p>
        </unitFace>
      </li>
    </ul>
    <hr class="enemy-separation" />

    <article>
      <template v-if="currentEnemyInfo">
        <div>{{ currentEnemyInfo.unit!.text || currentEnemyInfo.unit!.charaName }}
          <span style="color: var(--text-color-selected-2);">*{{ currentEnemyInfo.count }}</span>
        </div>
        <textBgTransition>attributes</textBgTransition>
        <div class="enemy-attributes" v-if="currentEnemyInfo.attributes.revision">
          <tabs v-model:index="currentAttr" :list="(attributesKey as any)"></tabs>
          <p>*{{ questData.currentLevel!.data.enemyRevision / 100 }}</p>
        </div>
        <ul class="ability-attr">
          <li v-for="(value, key) in currentEnemyInfo.attributes[currentAttr]">
            <abbr class="ability-key" :title="AttributeName[key]">{{ key }}</abbr>
            <span class="ability-value">{{ value }}</span>
          </li>
        </ul>

        <textBgTransition>resistance</textBgTransition>
        <ul class="ability-attr ability-attr2">
          <li v-for="(p) of currentEnemyInfo.resistance">
            <span class="ability-key">{{ p.name }}</span>
            <span class="ability-value">{{ p.value }}</span>
          </li>
        </ul>

        <hr />
        <div class="enemy-text">{{ currentEnemyInfo.picturebook?.text || "null" }}</div>
      </template>
    </article>
  </section>
</template>

<script setup lang="ts">
import unitFace from "@/views/components/unitFace";
import tabs from "@/views/components/tabs";
import { textBgTransition } from "@/views/components";
import { AttributeName } from '@/data/calc/enums';
import { questData, questControl } from "@/store/quest";
import { computed, ref } from "vue";

const attributesKey = ['raw', 'revision'] as const;
const currentAttr = ref<typeof attributesKey[number]>("raw");
const enemyList = computed(() => {
  return questData.currentLevel?.detailedData.enemyDeployCount.enemyDeployCount;
});

const currentEnemyInfo = computed(() => {
  return questData.currentEnemy;
});
</script>

<style lang="scss" scoped>
@import "@/views/unit1//abilities/abilitiesRightComponents/attributes/unit-abilities-attributes.scss";
@import "./quest-details-enemyInfo.scss";
</style>