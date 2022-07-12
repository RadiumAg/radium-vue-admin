import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/IResponse';
import type { AxiosInstance } from 'axios';
import type { TGetLoginUserInfo } from './models/TGetLoginUserInfo';

@Api({ prefix: 'user' })
export class User {
  private http: AxiosInstance;

  /**
   * 更新用户权限
   *
   * @param {string} id
   * @param {string[]} roles
   * @return {*}
   * @memberof Role
   */
  async updateUserRole(id: string, roles: string[]) {
    return (
      await this.http.post<IResponse<string>>('updateUserRole', { id, roles })
    ).data;
  }

  /**
   * 获取当前登录用户信息
   *
   * @return {*}
   * @memberof User
   */
  async getLoginUserInfo() {
    return (
      await this.http.get<IResponse<TGetLoginUserInfo>>('getLoginUserInfo')
    ).data;
  }

  /**
   * 获得用户权限
   *
   * @param {string} id
   * @return {*}
   * @memberof User
   */
  async getUserRolesById(id: string) {
    return (
      await this.http.get<IResponse<string[]>>('getLoginUserInfo', {
        params: {
          id,
        },
      })
    ).data;
  }
}
