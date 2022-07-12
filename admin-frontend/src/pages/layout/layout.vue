<template>
  <div class="layout-wrapper">
    <el-container>
      <admin-slider class="slider" :collapse="isCollapse"></admin-slider>
      <el-container>
        <el-header><admin-header></admin-header></el-header>
        <el-main>
          <keep-alive-router-view></keep-alive-router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import KeepAliveRouterView from '@components/keep-alive-router-view/keep-alive-router-view.vue';
import AdminHeader from './header.vue';
import AdminSlider from './slider.vue';
import { LAYOUT_PROVIDE_KEY, LayoutProvide } from '.';

const isCollapse = ref(false);
provide<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
  isCollapse,
});
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}

.el-header {
  padding: 0;
  --el-header-height: max-content;
}

.el-main {
  // background-color: #f6f8f9;
  --el-main-padding: 10px;
}

.slider:not(.el-menu--collapse) {
  width: 200px;
}
</style>
