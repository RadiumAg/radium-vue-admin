<template>
  <el-menu class="menu" router :default-active="route.fullPath">
    <slider-child
      v-for="menuItem in allMenus"
      :key="menuItem._id"
      :menu="menuItem"
      :index="menuItem.menuUrl"
      :key-string="menuItem._id"
    ></slider-child>
  </el-menu>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useMenuStore } from '@core/pinia/stores/menu-store';
import SliderChild from './slider-child.vue';

const { allMenus } = useMenuStore();
const route = useRoute();
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}
</style>
