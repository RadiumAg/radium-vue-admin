<template>
  <div class="header">
    <div class="nav">
      <div class="left">
        <el-icon
          class="fold"
          :class="{
            ['is-open']: isCollapse,
          }"
          @click="isCollapse = !isCollapse"
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
        <div class="operate">
          <el-button-group>
            <el-button
              text
              :icon="Brush"
              @click="themeDrawerVisible = true"
            ></el-button>

            <el-button
              text
              :icon="FullScreen"
              @click="handleToggleScreenFull"
            ></el-button>
          </el-button-group>
        </div>

        <el-switch
          v-model="isDark"
          class="dark-switch"
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
          :id="tag.id"
          :key="tag.id"
          :path="tag.menuPath"
          :name="tag.menuName"
          @click.right="handleMouseRight(tag.id, $event)"
        ></tag-item>
      </el-scrollbar>
    </div>

    <menu-context
      v-model="menuContextData.visible"
      :left="menuContextData.x"
      :top="menuContextData.y"
      @after-close="handleContextClose"
    ></menu-context>

    <theme-drawer v-model="themeDrawerVisible"></theme-drawer>
  </div>
</template>

<script lang="ts" setup>
import { removeInclude, useMenuStore } from '@core/pinia/stores/menu-store';
import { Brush, Fold, FullScreen, Moon, Sunny } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { useDark } from '@vueuse/core';
import { useUserStore } from '@core/pinia/stores/user-store';
import { useClosePage } from '@core/hooks/use-close-page';
import ThemeDrawer from './components/theme-drawer/theme-drawer.vue';
import MenuContext from './components/menu-context/menu-context.vue';
import RoleDropdown from './components/role-dropdown/role-dropdown.vue';
import TagItem from './components/tag-item/tag-item.vue';
import { EventType } from './components/menu-context';
import { LAYOUT_PROVIDE_KEY, type LayoutProvide } from '.';

const { isCollapse } = inject<LayoutProvide>(LAYOUT_PROVIDE_KEY, {
  isCollapse: ref(false),
});

const toggleScreen = useFullscreen();
const { userInfo } = useUserStore();
const route = useRoute();
const router = useRouter();
const themeDrawerVisible = ref(false);
const closePage = useClosePage();
const { currentMenus, activeMenuId } = toRefs(useMenuStore());
const isDark = useDark();
const menuContextData = reactive({
  x: 0,
  y: 0,
  menuId: '',
  visible: false,
});

useEventListener('click', () => {
  menuContextData.visible = false;
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
        currentMenus.value.find(menu => menu.id === menuContextData.menuId)
          .menuName,
      );
      router.replace({
        name: 'redirect',
        params: {
          redirect: route.path,
        },
      });
      break;
    }

    case EventType.关闭左侧: {
      const leftMenus = currentMenus.value.slice(
        0,
        currentMenus.value.findIndex(
          menu => menu.id === menuContextData.menuId,
        ),
      );
      leftMenus.forEach(({ id: menuId }) => {
        closePage(menuId);
      });
      break;
    }

    case EventType.关闭右侧: {
      const rightMenus = currentMenus.value.slice(
        currentMenus.value.findIndex(
          menu => menu.id === menuContextData.menuId,
        ) + 1,
      );
      rightMenus.forEach(({ id: menuId }) => {
        closePage(menuId);
      });
      break;
    }
  }
};

const handleToggleScreenFull = () => {
  toggleScreen.toggle();
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
    flex-shrink: 0;
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

    .dark-switch {
      margin-left: 10px;
    }

    .role-arrow {
      font-size: 14px;
    }
  }

  .fold {
    cursor: pointer;
    font-size: 20px;
    margin-right: 10px;
    transform: rotate(180deg);

    &.is-open {
      transform: rotate(0);
    }
  }
}
</style>
