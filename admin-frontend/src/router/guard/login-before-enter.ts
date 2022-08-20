import { useErrorMessage } from '@core/hooks';
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
  const { setAllMenus } = (await import('@core/pinia')).useMenuStore();
  const { setRoles } = (await import('@core/pinia')).useRoleStore();
  const { setUserInfo } = (await import('@core/pinia')).useUserStore();

  const { data } = await userApi.getUserMenusInfo();
  setAllMenus(data.roles[0].menus);
  setRoles(data.roles);
  setUserInfo({ userId: data._id, username: data.username });
};
