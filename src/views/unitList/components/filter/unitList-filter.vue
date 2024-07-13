<template>
  <article class="unitList-filter">
    <template v-if="showFilter">
      <input type="checkbox" id="filter">
      <div class="filter-text family-Orbitron">
        <label for="filter">
          <svg t="1676819210693" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1508" width="16" height="16">
            <path
              d="M783.837867 238.933333c4.096 0 7.441067 3.345067 7.441066 7.441067v427.008l84.650667-84.548267a7.441067 7.441067 0 0 1 10.513067 0l42.120533 42.120534a7.441067 7.441067 0 0 1 0 10.513066c-93.764267 106.0864-141.994667 159.1296-144.725333 159.1296h-59.5968a7.441067 7.441067 0 0 1-7.441067-7.4752V246.3744c0-4.096 3.345067-7.441067 7.441067-7.441067h59.5968zM607.573333 716.8c3.754667 0 6.826667 3.072 6.826667 6.826667v54.613333a6.826667 6.826667 0 0 1-6.826667 6.826667H75.093333a6.826667 6.826667 0 0 1-6.826666-6.826667v-54.613333c0-3.754667 3.072-6.826667 6.826666-6.826667h532.48z m0-204.8c3.754667 0 6.826667 3.072 6.826667 6.826667v54.613333a6.826667 6.826667 0 0 1-6.826667 6.826667H75.093333a6.826667 6.826667 0 0 1-6.826666-6.826667v-54.613333c0-3.754667 3.072-6.826667 6.826666-6.826667h532.48z m-204.8-204.8c3.754667 0 6.826667 3.072 6.826667 6.826667v54.613333a6.826667 6.826667 0 0 1-6.826667 6.826667H75.093333a6.826667 6.826667 0 0 1-6.826666-6.826667V314.026667c0-3.754667 3.072-6.826667 6.826666-6.826667h327.68z"
              fill="#1296db" p-id="1509"></path>
          </svg>
        </label>
        <span>
          {{ filterListLen === current.list.length ? "ALL - " :
            `${filterListLen}/` }}
          {{ current.list.length }}
        </span>
      </div>
    </template>
    <div class="filter-text family-Orbitron" v-else-if="current.list.length">
      <span>{{ current.list.length }}</span>
    </div>
    <ul class="filter-list">
      <template v-if="current.type === 'character'">
        <li>
          <p>rarity</p>
          <ul class="sub-list">
            <li v-for="item of filterData.rarity" :class="{ selected: item.is }" @click="item.is = !item.is">
              <span :title="item.name">
                <img :src="Url(getIconRarity(item.id))">
              </span>
            </li>
          </ul>
        </li>
        <li>
          <p>weapon</p>
          <ul class="sub-list">
            <li v-for="(item, i) of filterData.job" :class="{ selected: item.is }">
              <span>
                <img @click="toggleFilterJob(item)" :title="item.name" :src="Url(getIcon.job(item.id))">
                <div @click="jobIndex = i">
                  <svg t="1691431200252" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    :class="{ 'select': jobIndex === i }" xmlns="http://www.w3.org/2000/svg" p-id="7608" width="22"
                    height="22">
                    <path
                      d="M512 329.142857a73.142857 73.142857 0 1 0-71.314286-73.142857A73.142857 73.142857 0 0 0 512 329.142857z m-73.142857 182.857143a73.142857 73.142857 0 1 0 73.142857-73.142857 73.142857 73.142857 0 0 0-73.142857 73.142857z m73.142857 329.142857a73.142857 73.142857 0 1 0-73.142857-73.142857 73.142857 73.142857 0 0 0 73.142857 73.142857z"
                      p-id="7609"></path>
                  </svg>
                </div>
              </span>
            </li>
          </ul>
        </li>
        <li class="weapon-sub-list">
          <ul class="sub-list">
            <li v-for="item of filterData.job[jobIndex].list" @click="toggleFilterJob(item)" :key="item.id"
              :class="{ selected: item.is }">
              <span :title="item.name">{{ item.name }}</span>
            </li>
          </ul>
        </li>
        <li>
          <p>attr</p>
          <ul class="sub-list">
            <li v-for="item of filterData.attr" :class="{ selected: item.is }" @click="item.is = !item.is">
              <span :title="item.name">
                <img :src="Url(getIcon.attr(item.id as EUnit.Attr))">
              </span>
            </li>
          </ul>
        </li>
        <li>
          <p>summon</p>
          <ul class="sub-list">
            <li v-for="item of filterData.summon" :class="{ selected: item.is }" @click="item.is = !item.is">
              <span :title="item.name">
                <img :src="Url(getIcon.summon(item.id))">
              </span>
            </li>
          </ul>
        </li>
        <li>
          <p>move</p>
          <ul class="sub-list">
            <li v-for="item of filterData.move" :class="{ selected: item.is }" @click="item.is = !item.is">
              <span :title="item.name">
                {{ item.name }}
              </span>
            </li>
          </ul>
        </li>
      </template>
      <template v-if="showFilter">
        <li>
          <p>trait</p>
          <ul class="sub-list">
            <li v-for="item of filterData.trait" :class="{ selected: item.is }" @click="item.is = !item.is">
              <span :title="item.name">
                {{ item.name }}
              </span>
            </li>
          </ul>
        </li>
        <li>
          <label for="filter">
            <p @click="apply">save</p>
          </label>
          <p @click="resetFilter">clear</p>
        </li>
      </template>
    </ul>
  </article>
</template>

<script setup lang="ts">
import filter from './unitList-filter';
import { Url } from '@/service';
import { getIconRarity, getIcon } from "@/data/iconSrc";
import { computed } from 'vue';

const {
  jobIndex, filterData, resetFilter, apply, toggleFilterJob,
  current, filterListLen
} = filter();

const showFilter = computed(() => {
  return ['character', 'token'].includes(current.value.type);
})

</script>

<style lang="scss" scoped>
@import "./unitList-filter.scss";
</style>