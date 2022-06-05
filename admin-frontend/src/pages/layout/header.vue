<template>
  <div class="header">
    <div class="left">
      <el-icon class="fold"><fold></fold></el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="(m, index) in route.matched"
          :key="index"
          :to="{ path: m.path }"
          >{{ m.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right"></div>
  </div>

  <div class="tags">
    <el-scrollbar
      :view-style="{
        display: 'flex',
      }"
    >
      <tag-item
        v-for="tag in currentMenus"
        :id="tag.menuId"
        :key="tag.menuId"
        :path="tag.menuPath"
        :name="tag.menuName"
      ></tag-item>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@core/pinia/stores/menuStore';
import { Fold } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import TagItem from './components/tag-item/tag-item.vue';

const route = useRoute();

const { currentMenus } = useMenuStore();
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
