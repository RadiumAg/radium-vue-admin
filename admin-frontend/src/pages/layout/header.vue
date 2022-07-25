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
          @click.right="handleMouseRight(tag.menuId, $event)"
        ></tag-item>
      </el-scrollbar>
    </div>

    <menu-context
      v-model="menuContextData.visible"
      :left="menuContextData.x"
      :top="menuContextData.y"
      @after-close="handleContextClose"
    ></menu-context>
  </div>
</template>

<script lang="ts" setup>
import {
  removeCurrentMenus,
  removeInclude,
  useMenuStore,
} from '@core/pinia/stores/menu-store';
import { Fold, Moon, Sunny } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { useUserStore } from '@core/pinia/stores/user-store';
import { useClosePage } from '@core/hooks/use-close-page';
import MenuContext from './components/menu-context/menu-context.vue';
import RoleDropdown from './components/role-dropdown/role-dropdown.vue';
import TagItem from './components/tag-item/tag-item.vue';
import { EventType } from './components/menu-context';
import { LAYOUT_PROVIDE_KEY, type LayoutProvide } from '.';

const { isCollapse } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
  isCollapse: ref(false),
});

const { userInfo } = useUserStore();
const route = useRoute();
const router = useRouter();
const closePage = useClosePage();
const { currentMenus, activeMenuId } = toRefs(useMenuStore());
const isDark = useDark();
const menuContextData = reactive({
  x: 0,
  y: 0,
  menuId: '',
  visible: false,
});

const handleMouseRight = (menuId: string, mouseEvent: MouseEvent) => {
  mouseEvent.preventDefault();
  menuContextData.x = mouseEvent.clientX;
  menuContextData.y = mouseEvent.clientY;
  menuContextData.visible = true;
  menuContextData.menuId = menuId;
};

const handleContextClose = (event: EventType) => {
  menuContextData.visible = false;
  switch (event) {
    case EventType.关闭: {
      closePage(menuContextData.menuId);
      break;
    }

    case EventType.刷新: {
      removeInclude(
        currentMenus.value.find(menu => menu.menuId === props.menuId).menuName,
      );
      router.replace({ name: '/redirect', params: route.params });
      break;
    }

    case EventType.关闭左侧: {
      const leftMenus = currentMenus.value.slice(
        0,
        currentMenus.value.findIndex(
          menu => menu.menuId === menuContextData.menuId,
        ),
      );
      leftMenus.forEach(({ menuId }) => {
        closePage(menuId);
      });
      break;
    }

    case EventType.关闭右侧: {
      const rightMenus = currentMenus.value.slice(
        currentMenus.value.findIndex(
          menu => menu.menuId === menuContextData.menuId,
        ) + 1,
      );
      rightMenus.forEach(({ menuId }) => {
        closePage(menuId);
      });
      break;
    }
  }
};

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
