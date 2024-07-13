<template>
  <div>
    <input type="checkbox" :id="id" :checked @change="$emit('switch', (<HTMLInputElement>$event.target).checked)">
    <label :for="id" class="config-btn">
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
const { id, checked } = defineProps<{
  id: any;
  checked: boolean;
}>();

</script>

<style lang="scss" scoped>
input:not([type="number"]) {
  display: none;
}

input:checked {
  + .config-btn {
    border: 3px solid var(--color-border);

    &::after {
      left: 50%;
      background: var(--color-bg-checked);
    }
  }
}

.config-btn {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: 3px solid var(--color-border-2);
  border-radius: 10px;
  width: 40px;
  height: 20px;
  cursor: pointer;
  vertical-align: middle;
  transition: all .2s ease;

  &::after {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 10px;
    width: 50%;
    background: var(--color-bg-btn-2);
    content: "";
    transition: .2s ease;
  }
}
</style>