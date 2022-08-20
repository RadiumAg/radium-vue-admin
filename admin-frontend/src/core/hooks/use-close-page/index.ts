import { useMenuStore } from '@core/pinia';
import { useRouter } from 'vue-router';

export const useClosePage = () => {
  const router = useRouter();
  const { removeCurrentMenus, removeInclude } = useMenuStore();
  return (id: string) => {
    removeInclude(id);
    const nextMenu = removeCurrentMenus(id);
    router.replace(nextMenu.menuPath);
  };
};
