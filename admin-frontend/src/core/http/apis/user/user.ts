import { Api } from '@core/http/decorators/api';
import type { AxiosInstance } from 'axios';
import type { IResponse } from '@core/http/IResponse';
import type { TGetAllUserRes } from './models/TGetAllUserRes';
import type { TGetLoginUserInfo } from './models/TGetLoginUserInfo';
import type { TGetUserMenusInfo } from './models/TGetUserMenuInfoRes';

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
      await this.http.get<IResponse<TGetUserMenusInfo>>('getUserMenusInfo')
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
    return (await this.http.get<IResponse<TGetAllUserRes>>('getAllUser')).data;
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
      await this.http.get<IResponse<string[]>>('getUserRolesById', {
        params: {
          id,
        },
      })
    ).data;
  }
}
