<template>
  <admin-card class="card-wrapper" margin="0 10px 0 0">
    <header><slot name="header"></slot></header>
    <slot></slot>
  </admin-card>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
</script>

<style lang="scss" scoped>
header {
  display: flex;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.card-wrapper {
  display: inline-block;
}
</style>
