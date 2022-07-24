import { removeCurrentMenus } from '@core/pinia/stores/menu-store';
import { useRouter } from 'vue-router';

export const useClosePage = () => {
  const router = useRouter();
  return (menuId: string) => {
    const nextMenu = removeCurrentMenus(menuId);
    router.replace(nextMenu.menuPath);
  };
};
