import { useErrorMessage } from '@core/hooks/use-error-message';
import { AdminError } from '@core/http/admin-error';
import { User } from '@core/http/apis/user/user';
import { ElMessage } from 'element-plus';
import type { RouteLocationNormalized } from 'vue-router';

export const loginBeforeEnter = async (to: RouteLocationNormalized) => {
  const userApi = new User();

  try {
    await userApi.getLoginUserInfo();
  } catch (e) {
    if (e instanceof AdminError) {
      ElMessage.warning('请重新登录');
    } else {
      useErrorMessage(e);
    }
    return `/login?redirect='${to.fullPath}'`;
  }
};
