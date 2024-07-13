<template>
  <searchInput></searchInput>
  <searchResultList></searchResultList>
</template>

<script setup lang="ts">
import searchInput from './components/searchInput';
import searchResultList from './components/searchResultList';
</script>

<style lang="scss" scoped>
* {
  font-size: clamp(1.3rem, 1.55vw, 1.45rem);
}
</style>