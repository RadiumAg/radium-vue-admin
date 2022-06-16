<template>
  <admin-card
    padding="0"
    auto-fill
    margin="0"
    flex-direction="column"
    :border="false"
  >
    <div class="operate-area">
      <el-button type="primary">添加</el-button>
    </div>

    <admin-card padding="0" auto-fill margin="0" :border="false">
      <admin-table :data="tableData" row-key="_id">
        <el-table-column type="selection"></el-table-column>

        <el-table-column label="菜单名称" prop="menuName"></el-table-column>

        <el-table-column label="菜单名称" prop="menuName"></el-table-column>

        <el-table-column label="菜单地址" prop="menuUrl"></el-table-column>

        <el-table-column label="菜单图标" prop="menuIcon"></el-table-column>
      </admin-table>
    </admin-card>

    <admin-dialog v-model="addMenuDialogData.visible"></admin-dialog>
  </admin-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import AdminDialog from '@components/admin-dialog/admin-dialog.vue';
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';
import AdminCard from '@components/admin-card/admin-card.vue';

const { menu } = useApi();
const tableData = ref([]);
const addMenuDialogData = reactive({
  visible: true,
});

const getData = async () => {
  try {
    const resData = await menu.getAllMenu();
    tableData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

getData();
</script>

<style lang="scss" scoped>
.operate-area {
  display: flex;
  margin-bottom: 5px;
  justify-content: flex-end;
}
</style>
