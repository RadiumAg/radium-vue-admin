<template>
  <div class="operate-area">
    <el-button type="primary" @click="handleUpdateRoles">保存</el-button>
  </div>
  <admin-table
    :to-ref="
      ref => {
        tableRef = ref;
      }
    "
    :data="tableData"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection"></el-table-column>

    <el-table-column label="角色名称" prop="roleName"></el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import { AdminTable } from '@components';
import { useErrorMessage } from '@core/hooks';
import { useApi } from '@core/http';
import { defaultThrottleTime } from '@core/utils';
import { ElMessage, ElTable } from 'element-plus';
import { USER_MANAGER_PROVIDE_KEY } from '.';
import type { GetPageRoleRes } from '@core/http/apis/role/types';

const tableRef = ref<InstanceType<typeof ElTable>>();
const { role, user } = useApi();
const tableData = ref([]);
const selectionRoles = ref<string[]>([]);
const { userId } = inject(USER_MANAGER_PROVIDE_KEY);

const getData = async () => {
  try {
    const resData = await role.getAllRole();
    tableData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

const handleUpdateRoles = async () => {
  try {
    if (selectionRoles.value.length === 0) {
      ElMessage.warning('请选择用户权限');
      return;
    }
    const res = await user.updateUserRole(userId.value, selectionRoles.value);
    ElMessage.success(res.msg);
  } catch (e) {
    useErrorMessage(e);
  }
};

const getUserRoles = useThrottleFn(async () => {
  try {
    const resData = await user.getUserRolesById(userId.value);
    tableRef.value.clearSelection();
    resData.data.forEach(roleId => {
      tableRef.value.toggleRowSelection(
        tableData.value.find(data => data._id === roleId),
        true,
      );
    });
  } catch (e) {
    useErrorMessage(e);
  }
}, defaultThrottleTime);

const handleSelectionChange = (selection: GetPageRoleRes[]) => {
  selection = selection.filter(_ => _);
  selectionRoles.value = selection.map(_ => _._id);
};

watch(userId, getUserRoles);

getData();
</script>

<style lang="scss" scoped>
.operate-area {
  margin-bottom: 10px;
}
</style>
