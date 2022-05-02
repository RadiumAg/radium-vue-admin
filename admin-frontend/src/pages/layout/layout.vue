<template>
  <div class="layout-wrapper">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}
</style>
