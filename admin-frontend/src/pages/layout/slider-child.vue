<template>
  <el-sub-menu v-if="menu.children.length > 0">
    <template #title>
      <el-icon><component :is="menu.menuIcon"></component></el-icon>
      <span>{{ menu.menuName }}</span>
    </template>
    <slider-child
      v-for="(item, i) in menu.children"
      :key="item._id"
      :menu="item"
      :index="i"
    ></slider-child>
  </el-sub-menu>
  <el-menu-item v-else :index="index">
    <template #title>
      <el-icon><component :is="menu.menuIcon"></component></el-icon>
      <span>{{ menu.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { GetAllRes } from '@core/http/apis/menu/models/TGetAllRes';

defineProps({
  menu: {
    type: Object as PropType<GetAllRes>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
