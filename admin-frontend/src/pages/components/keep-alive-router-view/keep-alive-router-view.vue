<template>
  <router-view v-slot="{ Component }" :include="menuInclude">
    <transition>
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@core/pinia/stores/menuStore';

const { menuInclude } = useMenuStore();
</script>
