<template>
  <admin-table :data="roleData">
    <el-table-column label="角色名称"></el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';
import { ref } from 'vue';
import type { TGetPageRoleRes } from '@core/http/apis/role/models/TGetPageRoleRes';

const { role } = useApi();
const roleData = ref<TGetPageRoleRes[]>([]);

const getData = async () => {
  try {
    const resData = await role.getAllRole();
  } catch (e) {
    useErrorMessage(e);
  }
};
</script>
