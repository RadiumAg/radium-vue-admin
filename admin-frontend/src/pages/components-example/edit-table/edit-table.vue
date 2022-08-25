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
import { AdminCard } from '@components';
import { useApi } from '@core/http';
import InputCell from './input-cell';
import type { Column } from 'element-plus';



const { example } = useApi();
const tableData = ref([]);

const cellRenderer = ({ rowData, column }) => {
  return rowData[column.dataKey]
    ? h(InputCell, {
        forwardRef: ref => {
          ref?.focus?.();
        },
        onKeydownEnter() {
          rowData[column.dataKey] = false;
        },
        onChange(val) {
          rowData[column.dataKey] = val;
        },
        value: rowData[column.dataKey],
      })
    : h(
        'div',
        {
          onclick() {
            rowData[column.dataKey] = true;
          },
        },
        [rowData[column.dataKey]],
      );
};

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
    cellRenderer,
  },
  {
    title: '邮箱',
    dataKey: 'email',
    width: 200,
    cellRenderer,
  },
];

const getData = async () => {
  const { data } = await example.getExampleUsers();
  tableData.value = data;
};

getData();
</script>

<style lang="scss" scoped></style>
