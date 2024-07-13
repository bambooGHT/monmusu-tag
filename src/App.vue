<template>
  <RouterView v-if="$route.meta.aloneShow"></RouterView>
  <RouterView v-slot="{ Component, route }" v-else>
    <message></message>
    <propInfoPopup></propInfoPopup>
    <top></top>
    <keep-alive>
      <component :is="Component" :key="route.name" v-if="route.meta.isKeep" />
    </keep-alive>
    <component :is="Component" :key="route.path" v-if="!route.meta.isKeep" />
    <popupMask></popupMask>
  </RouterView>
</template>

<script setup lang="ts">
import top from './views/components/top';
import message from './message';
import popupMask from './views/components/popupMask';
import propInfoPopup from './views/components/propInfoPopup';
</script>