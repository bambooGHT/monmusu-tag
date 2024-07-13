<template>
  <header id="hander" class="header family-Roboto">
    <h2 @click="updateShowNav" class="header-title">{{ title }}</h2>
    <div class="header-title1">{{ title }}</div>
    <div @click="updateShowNav" class="disp-nav">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <nav class="header-nav">
      <RouterLink to="/" @click="updateShowNav">HOME</RouterLink>
      <RouterLink to="/unitList" @click="updateShowNav">
        UNIT LIST</RouterLink>
      <RouterLink to="/search" @click="updateShowNav">
        SEARCH</RouterLink>
      <RouterLink to="/attach" @click="updateShowNav">
        ATTACH</RouterLink>
      <RouterLink to="/questCategory" @click="updateShowNav">
        QUEST CATEGORY</RouterLink>
      <RouterLink to="/gallery" @click="updateShowNav">
        GALLERY</RouterLink>
      <RouterLink to="/aboutThisSite" @click="updateShowNav">
        ABOUT THIS SITE</RouterLink>
    </nav>
    <div class="header-lang">
      <div>monmusu-tag</div>
      <div>
        <span :class="theme" @click="toggleTheme">
          <svg v-if="theme === 'light'" t="1717122066327" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="7228" width="16" height="16">
            <path
              d="M512.1 801.5c-158.1 0-289.8-131.7-289.8-289.8S354 221.8 512.1 221.8s289.8 131.7 289.8 289.8-131.7 289.9-289.8 289.9z m0-52.7c131.7 0 237.1-105.4 237.1-237.1S643.9 274.5 512.1 274.5 275 379.9 275 511.7s105.4 237.1 237.1 237.1zM485.8 63.7h52.7v105.4h-52.7V63.7z m0 790.5h52.7v105.4h-52.7V854.2zM960 485.3V538H854.6v-52.7H960z m-790.4 0V538H64.2v-52.7h105.4z m642.9-310.9l36.9 36.9-73.8 73.8-36.9-36.9 73.8-73.8zM253.9 733l36.9 36.9-73.8 73.7-36.9-36.9 73.8-73.7z m595.5 79l-36.9 36.9-73.8-73.8 36.9-36.9 73.8 73.8zM290.8 253.4l-36.9 36.9-79-79 36.9-36.9 79 79z"
              p-id="7229"></path>
          </svg>
          <svg v-else t="1717121763765" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="6074" width="16" height="16">
            <path
              d="M593.054 120.217C483.656 148.739 402.91 248.212 402.91 366.546c0 140.582 113.962 254.544 254.544 254.544 118.334 0 217.808-80.746 246.328-190.144C909.17 457.12 912 484.23 912 512c0 220.914-179.086 400-400 400S112 732.914 112 512s179.086-400 400-400c27.77 0 54.88 2.83 81.054 8.217z"
              fill-opacity=".7" p-id="6075"></path>
          </svg>
        </span>
      </div>
      <span>中</span>
      <i> / </i>
      <span>日</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import title from '@/router/title';
import top from './top';

const { updateShowNav, theme, toggleTheme } = top();
</script>

<style lang="scss" scoped>
@import "./top.scss";
</style>