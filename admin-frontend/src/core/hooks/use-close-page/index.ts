import { useMenuStore } from '@core/pinia';
import { useRouter } from 'vue-router';

export const useClosePage = () => {
  const router = useRouter();
  const { removeCurrentMenus, removeInclude } = useMenuStore();

  return (id: string, isRouter = true) => {
    removeInclude(id);
    const nextMenu = removeCurrentMenus(id);
    if (isRouter) {
      router.replace(nextMenu.menuPath);
    }
  };
};
