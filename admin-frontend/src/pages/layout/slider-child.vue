<template>
  <el-sub-menu
    v-if="menu.children.length > 0"
    :index="menu.menuUrl || keyString"
  >
    <template #title>
      <el-icon v-if="menu.menuIcon"
        ><component :is="icons[menu.menuIcon]"></component
      ></el-icon>
      <span>{{ menu.menuName }}</span>
    </template>
    <slider-child
      v-for="item in menu.children"
      :key="item._id"
      :menu="item"
      :key-string="item._id"
      :index="item.menuUrl"
    ></slider-child>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.menuUrl" @click="handleSetTags">
    <template #title>
      <el-icon v-if="menu.menuIcon"
        ><component :is="icons[menu.menuIcon]"></component
      ></el-icon>
      <span>{{ menu.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts" setup>
import * as icons from '@element-plus/icons-vue';
import { useMenuStore } from '@core/pinia';
import type { PropType } from 'vue';
import type { GetAllRes } from '@core/http/apis/menu/types';

const { setCurrentMenus } = useMenuStore();
const { menu } = defineProps({
  menu: {
    type: Object as PropType<GetAllRes>,
    required: true,
  },
  index: {
    type: String,
    required: true,
  },
  keyString: {
    type: String,
    required: true,
  },
});

const handleSetTags = () => {
  const { menuUrl, _id, menuName, parentId } = menu;
  setCurrentMenus(_id, menuUrl, menuName, parentId);
};
</script>

<style lang="scss" scoped></style>
