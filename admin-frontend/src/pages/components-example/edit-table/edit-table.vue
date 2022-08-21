<template>
  <admin-card background height="100%" margin="0">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :height="height"
          :width="width"
          :data="[]"
          fixed
        ></el-table-v2>
      </template>
    </el-auto-resizer>
  </admin-card>
</template>

<script lang="ts" setup>
import AdminCard from '@components/admin-card/admin-card.vue';
import type { Column } from 'element-plus';

const columns: Column<any>[] = [
  {
    title: '姓名',
    dataKey: '',
    width: 100,
  },
];
</script>

<style lang="scss" scoped></style>
