<template>
  <div class="header">
    <div class="nav">
      <div class="left">
        <el-icon class="fold" @click="isCollapse = !isCollapse"
          ><fold></fold
        ></el-icon>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(m, index) in route.matched"
            :key="index"
            :to="{ path: m.path }"
            >{{ m.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>

      <div class="right">
        <el-switch
          v-model="isDark"
          size="default"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          :active-value="true"
          :inactive-value="false"
        ></el-switch>

        <el-avatar
          class="avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>

        <div class="username">{{ userInfo.username }}</div>
        <role-dropdown></role-dropdown>
      </div>
    </div>

    <div class="tags">
      <el-scrollbar
        :view-style="{
          display: 'flex',
          padding: '5px 10px',
        }"
      >
        <tag-item id="home" path="/" name="首页" :close-icon="false"></tag-item>
        <tag-item
          v-for="tag in currentMenus"
          :id="tag.menuId"
          :key="tag.menuId"
          :path="tag.menuPath"
          :name="tag.menuName"
        ></tag-item>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '@core/pinia/stores/menu-store';
import { Fold, Moon, Sunny } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { useDark } from '@vueuse/core';
import { useUserStore } from '@core/pinia/stores/user-store';
import RoleDropdown from './components/role-dropdown/role-dropdown.vue';
import TagItem from './components/tag-item/tag-item.vue';
import { LAYOUT_PROVIDE_KEY, type LayoutProvide } from '.';

const { isCollapse } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
  isCollapse: ref(false),
});
const { userInfo } = useUserStore();
const route = useRoute();
const { currentMenus, activeMenuId } = toRefs(useMenuStore());
const isDark = useDark();

onMounted(() => {
  if (activeMenuId.value === '') {
    activeMenuId.value = 'home';
  }
});
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 0 1px 3px 0 rgba(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

  .nav {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 15px 10px 0 10px;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .right {
    display: flex;
    align-items: center;

    .avatar {
      margin-left: 10px;
      margin-right: 10px;
    }

    .username {
      font-size: 14px;
      margin-right: 10px;
    }

    .role-arrow {
      font-size: 14px;
    }
  }

  .fold {
    cursor: pointer;
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
