<template>
  <admin-card background height="100%" margin="0">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :height="height"
          :width="width"
          :data="tableData"
          fixed
        ></el-table-v2>
      </template>
    </el-auto-resizer>
  </admin-card>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import { useApi } from '@core/http';
import type { Column } from 'element-plus';

const { example } = useApi();
const tableData = ref([]);
const columns: Column<any>[] = [
  {
    title: '姓名',
    dataKey: 'name',
    width: 100,
  },
  {
    title: '地址',
    dataKey: 'address',
    width: 100,
  },
  {
    title: '邮箱',
    dataKey: 'email',
    width: 200,
  },
];

const getData = async () => {
  const { data } = await example.getExampleUsers();
  tableData.value = data;
};

getData();
</script>

<style lang="scss" scoped></style>
