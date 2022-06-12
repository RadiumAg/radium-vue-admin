<template>
  <el-tree :data="data" highlight-current></el-tree>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useApi } from '@core/http/api-instance';
import { useErrorMessage } from '@core/hooks/use-error-message';
import type { Tree } from '.';

const { role } = useApi();

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

getRole();
</script>

<style lang="scss" scoped></style>
