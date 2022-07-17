<template>
  <admin-table :data="tableData">
    <el-table-column type="selection"></el-table-column>

    <el-table-column label="角色名称" prop="roleName"></el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';

const { role } = useApi();
const tableData = ref([]);

const getData = async () => {
  try {
    const resData = await role.getAllRole();
    tableData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped></style>
