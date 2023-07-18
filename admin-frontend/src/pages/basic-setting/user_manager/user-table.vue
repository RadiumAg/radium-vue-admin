<template>
  <admin-table :data="tableData.data" @current-change="userId = $event._id">
    <el-table-column label="用户名称" prop="username"></el-table-column>

    <el-table-column label="用户密码" prop="password"></el-table-column>

    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="warning" text @click="handleDeleteRole([row._id])"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </admin-table>
</template>

<script lang="ts" setup>
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks';
import { useApi } from '@core/http/api-instance';
import { ElMessage, ElMessageBox } from 'element-plus';
import { USER_MANAGER_PROVIDE_KEY } from '.';

const { userId } = inject(USER_MANAGER_PROVIDE_KEY);
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

const handleDeleteRole = async (id: string[]) => {
  try {
    await ElMessageBox.confirm('确认删除吗');
    const res = await user.deleteUserMany(id);
    ElMessage.success(res.msg);
    getData();
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped></style>
