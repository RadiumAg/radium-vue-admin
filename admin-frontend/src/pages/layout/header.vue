<template>
  <div class="header">
    <div class="left">
      <el-icon class="fold"><fold></fold></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="right"></div>
  </div>
</template>

<script lang="ts" setup>
import { Fold } from '@element-plus/icons-vue';
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;

  .left {
    display: flex;
  }

  .fold {
    margin-right: 10px;
  }
}
</style>
