<template>
  <el-table :data="tableData">
    <el-table-column label="菜单名称"></el-table-column>

    <el-table-column label="菜单地址"></el-table-column>

    <el-table-column label="菜单图标"></el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';
import { ref } from 'vue';
const { menu } = useApi();

const tableData = ref([]);

const getData = async () => {
  try {
    const resData = await menu.getAllMenu();
    tableData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped></style>
