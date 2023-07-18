<template>
  <div class="layout-wrapper">
    <el-container>
      <div
        v-if="isMobile && isCollapse"
        class="mask"
        @click="handleMaskClick"
      ></div>
      <admin-slider
        class="slider"
        :collapse-transition="!isMobile"
        :collapse="!isMobile && isCollapse"
        :class="{
          ['is-mobile']: isMobile,
          ['is-open']: isMobile && isCollapse,
        }"
      ></admin-slider>
      <el-container>
        <el-header><admin-header></admin-header></el-header>
        <el-main class="main-content">
          <keep-alive-router-view></keep-alive-router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import KeepAliveRouterView from '@components/keep-alive-router-view/keep-alive-router-view.vue';
import { useMobile } from '@core/hooks';
import AdminHeader from './header.vue';
import AdminSlider from './slider.vue';
import { LAYOUT_PROVIDE_KEY } from '.';
import type { LayoutProvide } from '.';

const isMobile = useMobile();
const isCollapse = ref(false);

watch(isMobile, () => {
  if (isMobile.value) {
    isCollapse.value = false;
  } else {
    isCollapse.value = true;
  }
});

const handleMaskClick = () => {
  isCollapse.value = false;
};

provide<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
  isCollapse,
});
</script>

<style lang="scss" scoped>
$collapse-width: 200px;

.layout-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column;

  .mask {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: fixed;
    background-color: rgba($color: #000000, $alpha: 0.1);
  }

  .el-header {
    padding: 0;
    --el-header-height: max-content;
  }

  .el-main {
    --el-main-padding: 10px;
  }

  .main-content {
    background-color: var(--el-bg-color-page);
  }

  .slider {
    &:not(.el-menu--collapse) {
      width: $collapse-width;
    }

    &.is-mobile {
      z-index: 1001;
      position: fixed;
      transition: transform 0.4s;
      transform: translateX(-$collapse-width);
    }

    &.is-mobile.is-open {
      transform: translateX(0);
    }
  }
}
</style>
