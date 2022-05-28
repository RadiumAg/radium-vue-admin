<template>
  <el-menu default-active="2" class="menu">
    <el-menu-item index="1">
      <template #title>
        <el-icon><location></location></el-icon>
        <span>菜单设置</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useApi } from '@core/http/api-instance';
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
}
</style>
