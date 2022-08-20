<template>
  <el-dropdown @command="handleCommand">
    <el-icon>
      <arrow-down></arrow-down>
    </el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="role in roleInfo.roles"
          :key="role._id"
          :command="role._id"
          >{{ role.roleName }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { useMenuStore, useRoleStore } from '@core/pinia';

const { roleInfo } = useRoleStore();
const { setAllMenus } = useMenuStore();

const handleCommand = (roleId: string) => {
  roleInfo.currentRole = roleId;
  const currentRole = roleInfo.roles.find(role => role._id === roleId);
  setAllMenus(currentRole.menus);
};
</script>

<style lang="scss" scoped></style>
