<template>
  <div class="theme-item-wrapper">
    <div class="title">{{ title }}</div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.theme-item-wrapper {
  .title {
    font-size: 14px;
    color: #333;
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>
