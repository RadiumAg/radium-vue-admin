import { useMenuStore } from '@core/pinia';
import { useRouter } from 'vue-router';

export const useClosePage = () => {
  const router = useRouter();
  const { removeCurrentMenus, removeInclude, activeMenuId } = toRefs(
    useMenuStore(),
  );

  return (id: string, isRouter = true) => {
    removeInclude.value(id);
    const nextMenu = removeCurrentMenus.value(id);
    if (isRouter) {
      activeMenuId.value = nextMenu.id;
      router.replace(nextMenu.menuPath);
    }
  };
};
