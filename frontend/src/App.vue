<template>
  <el-config-provider size="small" :locale="zhCn">
    <router-view> </router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<style lang="scss" scoped></style>
