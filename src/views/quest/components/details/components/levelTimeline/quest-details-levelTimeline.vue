<template>
  <section class="level-timeline" v-if="levelTimelineEvents" ref="timelineEvent">
    <ol class="level-timeline-list family-Roboto">
      <template v-for="(item) of levelTimelineEvents">
        <li :class="{ current: item === currentTimeline }" @click="updateCurrentTimeline(item)">
          <div class="family-Meiryo">
            id {{ item.id }} &lt{{ item.autoBoot ? TimeFormat.duration(item.startTime / FPS) + "s" : "dynamic" }}>
            *{{ item.callCount }}
          </div>
          <div>
            <span>event *{{ item.events.length }}</span>
            <span>enemy *{{ item.enemyTotal }}</span>
          </div>
          <i class="line"></i>
        </li>
      </template>
    </ol>

    <article class="level-timeline-info" :class="{ 'scroll-auto': currentShowInfo === 'enemy' }" v-if="currentTimeline">
      <div class="title family-Meiryo">id {{ currentTimeline.id }} {{ currentTimeline.autoBoot ? "" : "boot time +" }}
        {{ currentTimeline.startTime }}&lt{{ TimeFormat.duration(currentTimeline.startTime / FPS) }}s></div>
      <div>
        call count: {{ currentTimeline.callCount }}</div>
      <div>
        {{ `autoBoot: ${currentTimeline.autoBoot} ` }}
        {{ currentTimeline.nextEntryId ? `bextId: ${currentTimeline.nextEntryId}` : "" }}
      </div>
      <div class="toggle-show">
        <clickButton :selected="currentShowInfo === 'event'" @click="currentShowInfo = 'event'">
          event *{{ currentTimeline.events.length }}
        </clickButton>
        <clickButton :selected="currentShowInfo === 'enemy'" @click="currentShowInfo = 'enemy'">
          enemy *{{ currentTimeline.enemyTotal }}
        </clickButton>
      </div>
      <!-- events -->
      <ul v-if="currentShowInfo === 'event'" class="level-timeline-info-event">
        <li v-for="item of currentTimeline.events">
          <div class="title family-Meiryo" v-if="item.title">{{ item.title }}</div>
          <div class="family-Meiryo">
            {{ item.time }}&lt
            {{ TimeFormat.duration(item.time / FPS) }}s>
          </div>
          <ul class="event-units">
            <li v-for="{ id, resource, element: attr, rarityId: rarity, charaName, text } of item.units"
              :title="text || charaName">
              <unitFace :id :key="id" :resource :attr :rarity :category="'beastGod'">
              </unitFace>
              <p>{{ charaName }}</p>
            </li>
          </ul>
          <storyIcon v-if="item.story" :id="item.story.id" :name="item.story.name"></storyIcon>
          <div class="event-info">
            <template v-for="p of item.text">
              <img v-if="p.startsWith('http')" :src="p" alt="enemy-icon">
              <p v-else v-html="p"></p>
            </template>
          </div>
          <img v-if="item.icon" :src="item.icon">
          <div class="event-value family-Meiryo" v-for="p of item.values">
            <p class="name">{{ p.name }}</p>
            <p><span>value</span>: {{ p.value }}</p>
            <div>
              <p><span>range</span>: {{ p.rang }}</p>
              <p><span>trigger timing</span>: {{ p.triggerTiming }}</p>
            </div>
          </div>
        </li>
      </ul>
      <!-- enemys -->
      <ul v-else>
        <li v-for="{ time, list } of currentTimeline.deploys">
          <div class="family-Meiryo">
            {{ time }}&lt
            {{ TimeFormat.duration(time / FPS) }}s>
          </div>
          <ul class="event-enemy-info">
            <li v-for="{ enemy: { id, element, resource, charaName }, value, count } of list">
              <unitFace :id :key="id" class="route-list-min" :resource :attr="element" :rarity="82" :category="'enemy'">
              </unitFace>
              <div>
                <p>{{ charaName }} *{{ count }} (route {{ value.routeId }})</p>
                <div class="mark-text">
                  <p v-if="value.bossFlag">boss</p>
                  <p v-if="value.appInvincibleFlag">invincible</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </article>
  </section>
</template>

<script setup lang="ts">
import unitFace from '@/views/components/unitFace';
import storyIcon from '@/views/components/storyIcon';
import TimeFormat from '@/utils/timeFormat';
import { timeline, currentTimeline } from './quest-details-levelTimeline';
import { ref } from 'vue';
import { clickButton } from '@/views/components';

const FPS = EMap.MapBase.FPS;
const currentShowInfo = ref("event");
const { levelTimelineEvents, timelineEvent, updateCurrentTimeline } = timeline();
</script>

<style lang="scss" scoped>
@import "./quest-details-levelTimeline.scss";
</style>