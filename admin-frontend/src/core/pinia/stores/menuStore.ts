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

  const setMenus = (menuId: string, menuPath: string, menuName: string) => {
    menus.value.activeMenuId = menuId;
    if (menus.value.currentMenus.some(_ => _.menuId === menuId)) return;
    menus.value.currentMenus.push({
      menuId,
      menuPath,
      menuName,
    });
  };
  return { ...toRefs(menus.value), setInclude, setMenus };
});

export const { setInclude, setMenus } = useMenuStore();
