<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="menuInclude">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@core/pinia/stores/menuStore';
import { toRefs, watch } from 'vue';

const { menuInclude } = toRefs(useMenuStore());

watch(
  menuInclude,
  val => {
    console.log(val);
  },
  { deep: true },
);
</script>
