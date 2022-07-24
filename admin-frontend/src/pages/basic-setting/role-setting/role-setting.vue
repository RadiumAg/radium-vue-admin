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

      <el-button type="danger" @click="handleDelete">删除</el-button>
    </div>
    <role-table
      v-loading="isLoading"
      :data="roleData"
      @selection-change="selectionRows = $event"
    ></role-table>

    <add-dialog
      v-model="adminDialogVisible"
      @after-close="getData"
    ></add-dialog>
  </admin-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import AdminCard from '@components/admin-card/admin-card.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';
import { ElMessage, ElMessageBox } from 'element-plus';
import AddDialog from './add-dialog.vue';
import RoleTable from './role-table.vue';
import type { TGetPageRoleRes } from '@core/http/apis/role/models/TGetPageRoleRes';

const { role } = useApi();
const isLoading = ref(false);
const adminDialogVisible = ref(false);
const selectionRows = ref<TGetPageRoleRes[]>([]);
const roleData = ref<TGetPageRoleRes[]>([]);

const getData = async () => {
  try {
    isLoading.value = true;
    const resData = await role.getAllRole();
    isLoading.value = false;
    roleData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

const handleDelete = async () => {
  try {
    const flag = await ElMessageBox.confirm('是否删除?');
    if (flag === 'confirm') {
      await role.deleteRoleMany(selectionRows.value.map(_ => _._id));
      ElMessage.success('删除成功');
      getData();
    }
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
