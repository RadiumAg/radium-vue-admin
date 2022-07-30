<template>
  <div>
    <el-drawer direction="rtl" custom-class="drawer" v-bind="$attrs">
      <theme-item title="主题">
        <el-color-picker v-model="theme"></el-color-picker>
      </theme-item>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import ThemeItem from './theme-item.vue';

const theme = useCssVar('--el-color-primary', document.documentElement);
</script>

<style lang="scss" scoped>
:deep(div.el-drawer) {
  width: 250px !important;
}
</style>
