<template>
  <admin-table>
    <el-table-column label="用户名称"></el-table-column>

    <el-table-column label="用户密码"></el-table-column>

    <el-table-column label="操作"></el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';

const { user } = useApi();
const tableData = reactive({
  data: [],
  total: 0,
});

const getData = async () => {
  try {
    const resData = await user.getAllUser();
    tableData.data = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>

<style lang="scss" scoped></style>
