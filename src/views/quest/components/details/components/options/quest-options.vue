<template>
  <ul class="quest-options">
    <li>
      <switchButton :id="'route'" :checked="mapConfig.isDrawRoute" @switch="(checked) => levelMap.updateRoute(checked)">
      </switchButton>
      <span>draw route</span>
    </li>
    <li>
      <switchButton :id="'summonPoint'" :checked="mapConfig.isDrawSummonPoint"
        @switch="(checked) => levelMap.updateSummonPoint(checked)"></switchButton>
      <span>draw summon point</span>
    </li>
    <li>
      <switchButton :id="'core'" :checked="mapConfig.isDrawCore" @switch="(checked) => levelMap.updateCore(checked)">
      </switchButton>
      <span>draw core</span>
    </li>
    <li>
      <switchButton :id="'npc'" :checked="mapConfig.isDrawNpc" @switch="(checked) => levelMap.updateNpc(checked)">
      </switchButton>
      <span>draw npc</span>
    </li>
    <li>
      <switchButton :id="'scale'" :checked="mapConfig.isZoom" @switch="(checked) => levelMap.toggleZoom(checked)">
      </switchButton>
      <span>scale</span>
    </li>
    <li>
      <div class="level-slider">
        <slider :min="0" :max="60" :width="'250px'" :value="_sliderValue" @update="updateScale">
        </slider>
      </div>
    </li>
    <li class="clear" @click="levelMap.clearRoutePath()">
      clear route path
    </li>
    <li>path color</li>
  </ul>
</template>

<script setup lang="ts">
import { levelMap } from '@/store/quest';
import { slider, switchButton } from '@/views/components';
import { sliderValue } from "./index";
import { ref } from 'vue';

const _sliderValue = ref(sliderValue.value);
const { mapConfig } = levelMap;
const updateScale = (value: number) => {
  _sliderValue.value = value,
    sliderValue.value = value;
  levelMap.zoomable?.updateScale(value);
};
</script>

<style lang="scss" scoped>
.quest-options {
  margin: 0 5px;

  li {
    display: flex;
    height: 30px;
    line-height: 30px;

    div {
      margin-right: 10px;
    }
  }

  .clear {
    border-bottom: 2px solid var(--color-border);
    width: max-content;

    &:active,
    &:hover {
      cursor: pointer;
      color: var(--text-color-hover);
    }
  }

  .clear ~ li {
    text-decoration: line-through;
  }
}
</style>