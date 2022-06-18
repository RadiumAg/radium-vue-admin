<template>
  <div class="layout-wrapper">
    <el-container>
      <el-aside width="200px">
        <admin-slider></admin-slider>
      </el-aside>
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
</style>
