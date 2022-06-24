<template>
  <admin-table>
    <el-table-column></el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';

const { role } = useApi();

const getData = async () => {
  try {
    const resData = await role.getAllRole();
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>
