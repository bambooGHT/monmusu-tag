<template>
  <section class="level-info " v-if="level && levelDetailed">
    <!-- left -->
    <article>
      <p class="title family-Meiryo" v-html="level.name"></p>
      <div class="info-1">
        <p>
          <template v-if="level.iconUrl">
            <span>consume</span>
            <img :src="level.iconUrl" alt="consume-icon"> *{{ level.mana }}
          </template>
          <template v-else>
            <span>consume stamina</span>
            {{ level.mana || 0 }}
          </template>
        </p>
        <p>
          <span>recommend rank</span>{{ level.recommendLevel }}
        </p>
        <p>
          <span>sortie count</span>{{ level.sortieCount }}
        </p>
        <p>
          <span>enemy total</span>{{ enemyTotal }}
        </p>
        <p>
          <span>core life</span>{{ level.coreLife }}
        </p>
        <p v-if="level.loseTimeLimitFrame">
          <span>limit time</span>{{ TimeFormat.duration(level.loseTimeLimitFrame / FPS) }}s
        </p>
      </div>

      <textBgTransition>
        day of week open
      </textBgTransition>
      <p>{{ unlockWeeks() }}</p>

      <textBgTransition>
        introduction
      </textBgTransition>
      <p class="info-text family-Meiryo" v-html="level.text"></p>

      <template v-if="Object.values(level.levelStory).some(p => p && p)">
        <textBgTransition>
          story
        </textBgTransition>
        <ul class="level-storys">
          <template v-for="(p, key) in level.levelStory">
            <li v-if="p" :key="p">
              <StoryIcon :name="key" :id="p"></StoryIcon>
            </li>
          </template>
        </ul>
      </template>

      <template v-if="levelDetailed.needUnitopen">
        <textBgTransition>
          need unit open
        </textBgTransition>
        <template
          v-for="{ id, resource, element: attr, rarityId: rarity, classId: job, charaName } of [levelDetailed.needUnitopen]">
          <unitFace :id :resource :attr :rarity :job :category="'character'">
            <p>{{ charaName }}</p>
          </unitFace>
        </template>
      </template>

      <template v-if="levelDetailed.battleMemberList">
        <textBgTransition>
          deployable units
        </textBgTransition>
        <ul class="battle-units">
          <li
            v-for="{ unit: { id, resource, element: attr, rarityId: rarity = 82, classId: job = '', text, charaName }, ...value } of levelDetailed.battleMemberList"
            :title="text || charaName" :key="id">
            <unitFace :resource :id="value.id || id" :attr :rarity :job
              :category="value.cardId > 50000 ? 'token' : 'character'">
              <p>{{ charaName }}</p>
              <p>lv.{{ value.level }}</p>
              <p v-if="value.IsToken">token</p>
            </unitFace>
          </li>
        </ul>
      </template>

      <template v-if="levelDetailed.battleNPCList">
        <textBgTransition>
          NPC
        </textBgTransition>
        <ul class="battle-units">
          <li
            v-for="{ unit: { id, resource, element: attr, rarityId: rarity = 82, classId: job = '', text, charaName }, ...value } of levelDetailed.battleNPCList"
            :key="id">
            <unitFace :resource :id="value.id || id" :attr :rarity :job
              :category="value.cardId > 50000 ? 'token' : 'character'">
              <p>{{ charaName }}</p>
              <p>lv.{{ value.level }}</p>
              <p v-if="value.deadCoreDamage">core life</p>
              <p v-if="value.moveBan">move ban</p>
              <p>summon {{ value.summonPointId }}</p>
            </unitFace>
          </li>
        </ul>
      </template>
    </article>
    <!-- right -->
    <article>
      <textBgTransition class="win-rewards">
        win rewards
      </textBgTransition>
      <div class="info-1">
        <p><span>player exp</span>{{ level.playerExp || 0 }}</p>
        <p><span>unit exp</span>{{ level.unitExp || 0 }}</p>
        <p><span>gold</span>{{ level.gold || 0 }}</p>
      </div>
      <rewards1 :data="level.cleartable" :is-show-text="false" v-slot="{ item }">
        <p><span>count</span><span>{{ item.count }}</span></p>
        <p><span>drop rate</span><span>{{ item.m_probability }}%</span></p>
        <p><span>first drop rate</span><span>{{ item.m_firstProbability }}%</span></p>
      </rewards1>

      <template v-if="level.beginningRewardtable[0] || level.highLevelRewardtable[0]">
        <textBgTransition>
          first win rewards
        </textBgTransition>
        <rewards1 :data="[...level.highLevelRewardtable, ...level.beginningRewardtable]" :is-show-text="false"
          v-slot="{ item }">
          <p><span>count</span><span>{{ item.count }}</span></p>
        </rewards1>
      </template>

      <template v-if="level.delegatetable[0]">
        <textBgTransition>
          delegate
        </textBgTransition>
        <ul class="rewards">
          <li class="rewards-item rewards-item1" v-for="{ id, iconKey, rarity, name, count } of level.delegatetable"
            :key="id">
            <propComponent class="icon" :id :iconKey :rarity>
            </propComponent>
            <p>&nbsp; {{ `${name} *${count}` }}</p>
          </li>
        </ul>
      </template>

      <template v-if="levelDetailed.enemyBuffMenu[0]">
        <textBgTransition>
          enemyBuffMenu
        </textBgTransition>
        <ul class="enemyBuffMenu">
          <li v-for="p of levelDetailed.enemyBuffMenu">
            <p>{{ p.name }} </p>
            <p>{{ p.description }}</p>
            <p>rank {{ p.rank }}</p>
          </li>
        </ul>
      </template>

      <template v-if="levelDetailed.attachList">
        <textBgTransition>
          attach rewards
        </textBgTransition>
        <ul class="attachList">
          <li v-for="p of levelDetailed.attachList">
            <p>{{ p.name }}</p>
            <p>{{ p.text }}</p>
          </li>
        </ul>
      </template>
    </article>
  </section>
</template>

<script setup lang="ts">
import unitFace from "@/views/components/unitFace";
import StoryIcon from "@/views/components/storyIcon";
import propComponent from "@/views/components/propComponent";
import { rewards1 } from "../rewardsComponents";
import { textBgTransition } from "@/views/components";
import { questData } from "@/store/quest";
import { computed } from "vue";
import TimeFormat from "@/utils/timeFormat";

const FPS = EMap.MapBase.FPS;
const level = computed(() => {
  return questData.currentLevel?.data;
});

const levelDetailed = computed(() => {
  return questData.currentLevel?.detailedData;
});

const enemyTotal = computed(() => {
  const isDynamic = levelDetailed.value?.mapData.deployEntries.find(p => !p.auto);
  if (isDynamic) return "dynamic";
  return levelDetailed.value?.enemyDeployCount.total;
});

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const unlockWeeks = () => {
  const level = questData.currentLevel!.data!;
  if (level.termId) return level.termId.replace("_", " to ");
  if (!level.unlockWeeks.includes(0)) return "every day";
  return level.unlockWeeks.reduce((result: string[], v, index) => {
    v && result.push(daysOfWeek[index]);
    return result;
  }, []).join("、");
};
</script>

<style lang="scss" scoped>
@import "./quest-details-levelInfo.scss";
</style>