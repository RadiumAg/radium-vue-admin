import { useErrorMessage } from '@core/hooks/use-error-message';
import { User } from '@core/http/apis/user/user';
import { setAllMenus } from '@core/pinia/stores/menuStore';
import { setRoles } from '@core/pinia/stores/roleStore';
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
  const userInfo = await userApi.getUserMenusInfo();
  setAllMenus(userInfo.roles[0].menus);
  setRoles(userInfo.roles);
};
