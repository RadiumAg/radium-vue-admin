<template>
  <admin-card
    auto-fill
    margin="0"
    flex-direction="column"
    :border="false"
    padding="0"
  >
    <div class="operate-area">
      <el-button type="primary" @click="handleRootAdd">添加</el-button>
      <el-button type="success" @click="handleSave">保存</el-button>
    </div>

    <admin-card padding="0" auto-fill margin="0" :border="false">
      <admin-table
        v-loading="isLoading"
        :to-ref="
          ref => {
            tableRef = ref;
          }
        "
        :data="tableData"
        row-key="_id"
        @selection-change="selectionRows = $event"
      >
        <el-table-column type="selection"></el-table-column>

        <el-table-column label="菜单名称" prop="menuName"></el-table-column>

        <el-table-column label="菜单名称" prop="menuName"></el-table-column>

        <el-table-column label="菜单地址" prop="menuUrl"></el-table-column>

        <el-table-column label="菜单图标" prop="menuIcon">
          <template #default="{ row }">
            <el-icon>
              <component :is="icons[row.menuIcon]"></component
            ></el-icon>
          </template>
        </el-table-column>

        <el-table-column>
          <template #default="{ row }">
            <el-button text @click="handleEdit(row._id)">编辑</el-button>
            <el-button text type="primary" @click="handleAdd(row._id)"
              >添加</el-button
            >
            <el-button text type="warning" @click="handleDelete(row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </admin-table>
    </admin-card>

    <add-menu-dialog
      v-if="addMenuDialogData.visible"
      :id="addMenuDialogData.id"
      v-model="addMenuDialogData.visible"
      :parent-id="addMenuDialogData.parentId"
      @after-close="getData"
    ></add-menu-dialog>
  </admin-card>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import * as icons from '@element-plus/icons-vue';
import AdminTable from '@components/admin-table/admin-table.vue';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { useApi } from '@core/http/api-instance';
import AdminCard from '@components/admin-card/admin-card.vue';
import { defaultThrottleTime } from '@core/utils';
import { ElMessage, ElMessageBox, ElTable } from 'element-plus';
import { MENU_SETTING_PROVIDE, type MenuSettingProvide } from '../..';
import AddMenuDialog from './components/add-menu-dialog/add-menu-dialog.vue';
import { searchTableData } from './components/add-menu-dialog';
import type { GetAllRes } from '@core/http/apis/menu/types';

const { menu, role } = useApi();
const tableRef = ref<InstanceType<typeof ElTable>>();
const { roleId } = inject<MenuSettingProvide>(MENU_SETTING_PROVIDE, {
  roleId: ref(),
});
const selectionRows = ref<GetAllRes[]>([]);
const tableData = ref<GetAllRes[]>([]);
const isLoading = ref(false);
const addMenuDialogData = reactive({
  id: '',
  visible: false,
  parentId: '',
});

const getData = async () => {
  try {
    isLoading.value = true;
    const resData = await menu.getAllMenu();
    isLoading.value = false;
    tableData.value = resData.data;
  } catch (e) {
    useErrorMessage(e);
  }
};

const handleAdd = (parentId: string) => {
  addMenuDialogData.visible = true;
  addMenuDialogData.parentId = parentId;
  addMenuDialogData.id = '';
};

const handleDelete = async (id: string) => {
  try {
    await ElMessageBox.confirm('确认删除吗');
    const res = await menu.deleteById(id);
    ElMessage.success(res.msg);
    getData();
  } catch (e) {
    useErrorMessage(e);
  }
};

const handleRootAdd = () => {
  addMenuDialogData.visible = true;
  addMenuDialogData.parentId = '';
};

const handleEdit = (id: string) => {
  addMenuDialogData.id = id;
  addMenuDialogData.parentId = '';
  addMenuDialogData.visible = true;
};

const getRoleMenu = async () => {
  try {
    const resData = await role.getRoleMenu(roleId.value);
    tableRef.value.clearSelection();
    resData.data.forEach(_ => {
      const row = searchTableData(tableData.value, _);
      tableRef.value.toggleRowSelection(row, true);
    });
  } catch (e) {
    useErrorMessage(e);
  }
};

const handleSave = useThrottleFn(
  async () => {
    try {
      const resData = await role.updateRole({
        _id: roleId.value,
        menus: selectionRows.value.map(_ => _._id),
      });
      ElMessage.success(resData.msg);
    } catch (e) {
      useErrorMessage(e);
    }
  },
  defaultThrottleTime,
  false,
);

watch(roleId, getRoleMenu);

getData();
</script>

<style lang="scss" scoped>
.operate-area {
  display: flex;
  margin-bottom: 5px;
  justify-content: flex-end;
}
</style>
