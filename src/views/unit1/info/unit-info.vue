<template>
  <section class="picturebook family-Meiryo">
    <h1 class="title"> 【{{ `${unit.nickname || 'なし'}】${unit.charaName}` }}</h1>
    <article v-if="skin?.[1]">
      <div class="family-Orbitron">skin</div>
      <ul class="skin">
        <li v-for="(p, index) of skin" @dblclick="updateVoiceAndSpineResoure(p.resource_id, p.resource_key)"
          @click="currentSkin = p" :key="index">
          <unitFace :resource="p.icon" :rarity="unit.rarityId" :job="unit.classId" :attr="unit.element">
          </unitFace>
        </li>
      </ul>
      <div class="family-Orbitron">description</div>
      <p>{{ currentSkin.description }}</p>
      <br />
    </article>
    <article>
      <p>{{ picturebook.icon_text }}</p>
      <p>illustrator: {{ picturebook.illustrator }}</p>
      <p>CV: {{ picturebook.cv }}</p>
      <br />
      <template v-if="skin?.[0]">
        <p>{{ currentSkin.name }}</p>
      </template>
      <p v-if="currentSkin.profile">
        {{ currentSkin.profile }}
      </p>
      <p v-else>{{ picturebook?.text || "null" }}</p>
    </article>
  </section>
</template>

<script setup lang="ts">
import { unitDetailData, updateVoiceAndSpineResoure } from '@/store/unit1/unitData';
import unitFace from '@/views/components/unitFace';
import { ref } from 'vue';

const { skin, picturebook, unit } = unitDetailData;
const currentSkin = ref(skin?.[0] || {});
</script>

<style lang="scss" scoped>
@import "./unit-info.scss";
</style>