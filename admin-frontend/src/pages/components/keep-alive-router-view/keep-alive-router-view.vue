<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="menuInclude.map(menu => menu.componentName)">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useMenuStore } from '@core/pinia';

const { menuInclude } = toRefs(useMenuStore());
</script>

<style lang="scss" scoped></style>
