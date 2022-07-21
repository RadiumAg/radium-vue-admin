<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive :include="menuInclude">
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { useMenuStore } from '@core/pinia/stores/menu-store';

const { menuInclude } = toRefs(useMenuStore());
</script>

<style lang="scss" scoped>
@use '@assets/css/transition/transition.scss';
</style>
