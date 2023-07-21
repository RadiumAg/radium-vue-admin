<template>
  <div>
    <el-drawer direction="rtl" v-bind="$attrs">
      <theme-item title="Primary">
        <el-color-picker v-model="primary"></el-color-picker>
      </theme-item>

      <theme-item title="Danger">
        <el-color-picker v-model="danger"></el-color-picker>
      </theme-item>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import ThemeItem from './theme-item.vue';

const primary = useCssVar('--el-color-primary', document.documentElement);
const danger = useCssVar('--el-color-danger', document.documentElement);
</script>

<style lang="scss" scoped>
:deep(div.el-drawer) {
  width: 250px !important;
}
</style>
