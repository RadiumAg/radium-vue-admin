<template>
  <div class="layout-wrapper">
    <el-container>
      <el-aside width="200px">
        <admin-slider></admin-slider>
      </el-aside>
      <el-container>
        <el-header class="el-header"><admin-header></admin-header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
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
</style>
