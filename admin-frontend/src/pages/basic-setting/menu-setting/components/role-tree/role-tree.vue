<template>
  <el-tree
    :data="data"
    highlight-current
    default-expand-all
    @node-click="handleNodeClick"
  ></el-tree>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useApi } from '@core/http/api-instance';
import { useErrorMessage } from '@core/hooks/use-error-message';
import { MENU_SETTING_PROVIDE } from '../..';
import type { Tree } from '.';
import type { MenuSettingProvide } from '../..';

const { role } = useApi();
const { roleId } = inject<MenuSettingProvide>(MENU_SETTING_PROVIDE, {
  roleId: ref(),
});

const data = ref<Tree[]>([{ id: '1', label: '全部角色', children: [] }]);

const getRole = async () => {
  try {
    const resData = await role.getAllRole();
    data.value[0].children.push(
      ...resData.data.map<Tree>(_ => ({ id: _._id, label: _.roleName })),
    );
    data.value = data.value.slice();
  } catch (e) {
    useErrorMessage(e);
  }
};

const handleAdd = () => {};

const handleNodeClick = (data: Tree) => {
  roleId.value = data.id;
};

getRole();
</script>

<style lang="scss" scoped></style>
