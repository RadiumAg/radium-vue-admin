import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, toRefs } from 'vue';
import type { TGetAllRes } from '@core/http/apis/menu/models/TGetAllRes';

type Menu = {
  menuId: string;
  menuName: string;
  menuPath: string;
};

export const useMenuStore = defineStore('menu-tags', () => {
  const menusInfo = ref({
    allMenus: [] as TGetAllRes[],
    currentMenus: useLocalStorage<Menu[]>('current-menus', []),
    menuInclude: useLocalStorage('menu-include', []),
    activeMenuId: useLocalStorage('active-menu-id', ''),
  });

  const setInclude = (componentName: string) => {
    if (menusInfo.value.menuInclude.includes(componentName)) return;
    menusInfo.value.menuInclude.push(componentName);
  };

  const setActiveMenuId = (menuId: string) => {
    menusInfo.value.activeMenuId = menuId;
  };

  const setAllMenus = (menus: TGetAllRes[]) => {
    menusInfo.value.allMenus = menus;
  };

  const removeCurrentMenus = (menuId: string) => {
    const removeIndex = menusInfo.value.currentMenus.findIndex(
      _ => _.menuId === menuId,
    );
    menusInfo.value.currentMenus.splice(removeIndex, 1);
    const nextIndex = menusInfo.value.currentMenus.length - 1;
    const nextMenu = menusInfo.value.currentMenus[nextIndex]
      ? menusInfo.value.currentMenus[nextIndex]
      : {
          menuId: 'home',
          menuName: '首页',
          menuPath: '/',
        };
    menusInfo.value.activeMenuId = nextMenu?.menuId || '';
    return nextMenu;
  };

  const setCurrentMenus = (
    menuId: string,
    menuPath: string,
    menuName: string,
  ) => {
    menusInfo.value.activeMenuId = menuId;
    if (menusInfo.value.currentMenus.some(_ => _.menuId === menuId)) return;
    menusInfo.value.currentMenus.push({
      menuId,
      menuPath,
      menuName,
    });
  };
  return {
    ...toRefs(menusInfo.value),

    setInclude,
    setAllMenus,
    setCurrentMenus,
    setActiveMenuId,
    removeCurrentMenus,
  };
});

export const {
  setAllMenus,
  setInclude,
  setCurrentMenus,
  setActiveMenuId,
  removeCurrentMenus,
} = useMenuStore();
