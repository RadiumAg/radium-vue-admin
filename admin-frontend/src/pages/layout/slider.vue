<template>
  <el-menu default-active="2" class="menu">
    <slider-child
      v-for="(menuItem, index) in menus"
      :key="menuItem._id"
      :menu="menuItem"
      :index="index"
    ></slider-child>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApi } from '@core/http/api-instance';
import { useErrorMessage } from '@core/hooks/use-error-message';
import SliderChild from './slider-child.vue';
import type { GetAllRes } from '@core/http/apis/menu/models/TGetAllRes';

const menus = ref<GetAllRes[]>();
const { menu } = useApi();

const getMenu = async () => {
  try {
    const resData = await menu.getAllMenu();
    menus.value = resData.data;
  } catch (error) {
    useErrorMessage(error);
  }
};

getMenu();
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}
</style>
