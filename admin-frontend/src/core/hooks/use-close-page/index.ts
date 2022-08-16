import {
  removeCurrentMenus,
  removeInclude,
} from '@core/pinia/stores/menu-store';
import { useRouter } from 'vue-router';

export const useClosePage = () => {
  const router = useRouter();
  return (id: string) => {
    removeInclude(id);
    const nextMenu = removeCurrentMenus(id);
    router.replace(nextMenu.menuPath);
  };
};
