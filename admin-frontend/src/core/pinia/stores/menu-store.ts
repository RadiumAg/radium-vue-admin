import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, toRefs } from 'vue';
import type { GetAllRes } from '@core/http/apis/menu/types';

type Menu = {
  id: string;
  parentId: string;
  menuName: string;
  menuPath: string;
};

type MenuInclude = {
  id: string;
  componentName: string;
};

const joinSpread = '-';
const routerMeta = 'router';

const createMenuId = (menuId: string, path: string, router = false) => {
  const joinMeta = [menuId, path];
  if (router) joinMeta.push(routerMeta);
  return [menuId, path].join(joinSpread);
};

export const useMenuStore = defineStore('menu-tags', () => {
  const menusInfo = ref({
    allMenus: [] as GetAllRes[],
    currentMenus: useLocalStorage<Menu[]>('current-menus', []),
    menuInclude: useSessionStorage<MenuInclude[]>('menu-include', []),
    activeMenuId: useLocalStorage<string>('active-menu-id', ''),
  });

  const setInclude = (
    componentName: string,
    { router } = { router: false },
  ) => {
    const currentMenu = getCurrentMenu();
    if (
      menusInfo.value.menuInclude.some(
        menu => menu.componentName === componentName,
      )
    )
      return;
    const [, path] = currentMenu.id.split(joinSpread);
    menusInfo.value.menuInclude.push({
      componentName,
      id: router
        ? createMenuId(currentMenu.parentId, path, true)
        : currentMenu.id,
    });
  };

  const removeInclude = (id: string) => {
    const removeMenu = menusInfo.value.currentMenus.find(
      menu => menu.id === id,
    );
    const removeMenuRouter = menusInfo.value.menuInclude.find(menu =>
      menu.id.includes(removeMenu.parentId),
    );

    if (
      removeMenuRouter &&
      menusInfo.value.currentMenus.filter(
        menu => menu.parentId === removeMenuRouter?.id.split(joinSpread)[0],
      ).length <= 1
    ) {
      menusInfo.value.menuInclude = menusInfo.value.menuInclude.filter(
        menu => !(menu.id === removeMenuRouter.id),
      );
    }

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
    return menusInfo.value.currentMenus.find(
      menu => menu.id === menusInfo.value.activeMenuId,
    );
  };

  const setCurrentMenus = (
    menuId: string,
    menuPath: string,
    menuName: string,
    parentId: string,
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
      parentId,
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
