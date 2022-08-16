import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, toRefs } from 'vue';
import type { GetAllRes } from '@core/http/apis/menu/types';

type Menu = {
  id: string;
  menuName: string;
  menuPath: string;
};

type MenuInclude = {
  id: string;
  componentName: string;
};

const createMenuId = (menuId: string, path: string) => {
  return [menuId, path].join('-');
};

export const useMenuStore = defineStore('menu-tags', () => {
  const menusInfo = ref({
    allMenus: [] as GetAllRes[],
    currentMenus: useLocalStorage<Menu[]>('current-menus', []),
    menuInclude: useLocalStorage<MenuInclude[]>('menu-include', []),
    activeMenuId: useLocalStorage('active-menu-id', ''),
  });

  const setInclude = (componentName: string) => {
    const currentMenu = getCurrentMenu();
    if (menusInfo.value.menuInclude.some(menu => menu.id === currentMenu.id))
      return;
    menusInfo.value.menuInclude.push({
      componentName,
      id: currentMenu.id,
    });
  };

  const removeInclude = (id: string) => {
    if (!menusInfo.value.menuInclude.some(menu => menu.id === id)) return;
    menusInfo.value.menuInclude = menusInfo.value.menuInclude.filter(
      menu => !(menu.id === id),
    );
  };

  const setActiveMenuId = (id: string) => {
    menusInfo.value.activeMenuId = id;
  };

  const setAllMenus = (menus: GetAllRes[]) => {
    menusInfo.value.allMenus = menus;
  };

  const removeCurrentMenus = (id: string) => {
    const removeIndex = menusInfo.value.currentMenus.findIndex(
      _ => _.id === id,
    );
    menusInfo.value.currentMenus.splice(removeIndex, 1);
    const nextIndex = menusInfo.value.currentMenus.length - 1;
    const nextMenu = menusInfo.value.currentMenus[nextIndex]
      ? menusInfo.value.currentMenus[nextIndex]
      : {
          id: 'home',
          menuName: '首页',
          menuPath: '/',
        };
    menusInfo.value.activeMenuId = nextMenu?.id || '';
    return nextMenu;
  };

  const getCurrentMenu = () => {
    return menusInfo.value.currentMenus.find(menu => menu.id);
  };

  const setCurrentMenus = (
    menuId: string,
    menuPath: string,
    menuName: string,
  ) => {
    menusInfo.value.activeMenuId = createMenuId(menuId, menuPath);
    if (
      menusInfo.value.currentMenus.some(
        _ => _.id === menusInfo.value.activeMenuId,
      )
    )
      return;

    menusInfo.value.currentMenus.push({
      id: menusInfo.value.activeMenuId,
      menuPath,
      menuName,
    });
  };
  return {
    ...toRefs(menusInfo.value),

    setInclude,
    setAllMenus,
    setCurrentMenus,
    getCurrentMenu,
    setActiveMenuId,
    removeInclude,
    removeCurrentMenus,
  };
});

export const {
  setAllMenus,
  setInclude,
  removeInclude,
  setCurrentMenus,
  getCurrentMenu,
  setActiveMenuId,
  removeCurrentMenus,
} = useMenuStore();
