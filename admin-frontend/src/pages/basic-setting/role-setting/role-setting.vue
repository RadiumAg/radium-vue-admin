<template>
  <admin-card
    margin="0"
    height="100%"
    :border="false"
    padding="0"
    flex-direction="column"
  >
    <div class="operate">
      <el-button type="primary" @click="adminDialogVisible = true"
        >添加</el-button
      >

      <el-button type="danger" @click="adminDialogVisible = true"
        >删除</el-button
      >
    </div>
    <role-table :data="roleData"></role-table>
  </admin-card>

  <add-dialog v-model="adminDialogVisible" @after-close="getData"></add-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AdminCard from '@components/admin-card/admin-card.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';
import AddDialog from './add-dialog.vue';
import RoleTable from './role-table.vue';
import type { TGetPageRoleRes } from '@core/http/apis/role/models/TGetPageRoleRes';

const { role } = useApi();
const adminDialogVisible = ref(false);
const roleData = ref<TGetPageRoleRes[]>([]);

const getData = async () => {
  try {
    const resData = await role.getAllRole();
    roleData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped>
.operate {
  margin-bottom: 10px;
}
</style>
