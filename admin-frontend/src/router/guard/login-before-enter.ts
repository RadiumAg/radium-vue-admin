import { useErrorMessage } from '@core/hooks/use-error-message';
import { User } from '@core/http/apis/user/user';
import { AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import type { RouteLocationNormalized } from 'vue-router';

const userApi = new User();

export const loginBeforeEnter = async (to: RouteLocationNormalized) => {
  try {
    await loadAppData();
  } catch (e) {
    if (e instanceof AxiosError) {
      ElMessage.warning('请重新登录');
    } else {
      useErrorMessage(e);
    }

    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    };
  }
};

const loadAppData = async () => {
  const { setAllMenus } = await import('@core/pinia/stores/menu-store');
  const { setRoles } = await import('@core/pinia/stores/role-store');
  const userInfo = await userApi.getUserMenusInfo();
  setAllMenus(userInfo.data.roles[0].menus);
  setRoles(userInfo.data.roles);
};
