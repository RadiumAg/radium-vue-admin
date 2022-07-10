import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, toRefs } from 'vue';

type Menu = {
  menuId: string;
  menuName: string;
  menuPath: string;
};

export const useMenuStore = defineStore('menu-tags', () => {
  const menus = ref({
    currentMenus: useLocalStorage<Menu[]>('current-menus', []),
    menuInclude: useLocalStorage('menu-include', [], { deep: true }),
    activeMenuId: useLocalStorage('active-menu-id', ''),
  });

  const setInclude = (componentName: string) => {
    if (menus.value.menuInclude.includes(componentName)) return;
    menus.value.menuInclude.push(componentName);
  };

  const setActiveMenuId = (menuId: string) => {
    menus.value.activeMenuId = menuId;
  };

  const removeCurrentMenus = (menuId: string) => {
    const removeIndex = menus.value.currentMenus.findIndex(
      _ => _.menuId === menuId,
    );
    menus.value.currentMenus.splice(removeIndex, 1);
    const nextIndex = menus.value.currentMenus.length - 1;
    const nextMenu = menus.value.currentMenus[nextIndex]
      ? menus.value.currentMenus[nextIndex]
      : {
          menuId: 'home',
          menuName: '首页',
          menuPath: '/',
        };
    menus.value.activeMenuId = nextMenu?.menuId || '';
    return nextMenu;
  };

  const setCurrentMenus = (
    menuId: string,
    menuPath: string,
    menuName: string,
  ) => {
    menus.value.activeMenuId = menuId;
    if (menus.value.currentMenus.some(_ => _.menuId === menuId)) return;
    menus.value.currentMenus.push({
      menuId,
      menuPath,
      menuName,
    });
  };
  return {
    ...toRefs(menus.value),

    setInclude,
    setCurrentMenus,
    setActiveMenuId,
    removeCurrentMenus,
  };
});

export const {
  setInclude,
  setCurrentMenus,
  setActiveMenuId,
  removeCurrentMenus,
} = useMenuStore();
