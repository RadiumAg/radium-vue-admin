import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/type';
import type { AxiosInstance } from 'axios';
import type {
  GetAllUserRes,
  GetLoginUserInfo,
  GetUserMenusInfo,
} from './types';

@Api({ prefix: 'user' })
export class User {
  private http: AxiosInstance;

  /**
   * 获取当前用户菜单信息
   *
   * @return {*}
   * @memberof User
   */
  async getUserMenusInfo() {
    return (
      await this.http.get<IResponse<GetUserMenusInfo>>('getUserMenusInfo')
    ).data;
  }

  /**
   * 删除用户信息
   *
   * @param {string[]} ids
   * @return {*}
   * @memberof User
   */
  async deleteUserMany(ids: string[]) {
    return (await this.http.post<IResponse>('deleteUserMany', ids)).data;
  }

  /**
   * 获得所有用户
   *
   * @return {*}
   * @memberof User
   */
  async getAllUser() {
    return (await this.http.get<IResponse<GetAllUserRes>>('getAllUser')).data;
  }

  /**
   * 更新用户权限
   *
   * @param {string} _id
   * @param {string[]} roles
   * @return {*}
   * @memberof Role
   */
  async updateUserRole(_id: string, roles: string[]) {
    return (
      await this.http.post<IResponse<string>>('updateUserRole', { _id, roles })
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
      await this.http.get<IResponse<GetLoginUserInfo>>('getLoginUserInfo')
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
      await this.http.get<IResponse<string[]>>('getUserRolesById', {
        params: {
          id,
        },
      })
    ).data;
  }
}
