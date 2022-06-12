import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/IResponse';
import type { AxiosInstance } from 'axios';
import type { TGetPageRoleRes } from './models/TGetPageRoleRes';
import type { TInserTRoleData } from './models/TInsertRoleData';
import type { TUpdateRoleData } from './models/TUpdateRoleData';

@Api({ prefix: 'role' })
export class Role {
  private http: AxiosInstance;

  /**
   * 获取全部Role
   *
   * @param {number} pageIndex
   * @param {number} pageSize
   * @return {*}
   * @memberof Role
   */
  async getAllRole() {
    return (await this.http.get<IResponse<TGetPageRoleRes[]>>('getAllRole'))
      .data;
  }

  /**
   * 插入角色
   *
   * @param {TInserTRoleData} data
   * @return {*}
   * @memberof Role
   */
  async insertRole(data: TInserTRoleData) {
    return (await this.http.post('insertRole', data)).data;
  }

  /**
   * 分页role
   *
   * @param {number} pageIndex
   * @param {number} pageSize
   * @return {*}
   * @memberof Role
   */
  async getPageRole(pageIndex: number, pageSize: number) {
    return (
      await this.http.get<IResponse<TGetPageRoleRes[]>>('getPageRole', {
        params: { pageSize, pageIndex },
      })
    ).data;
  }

  /**
   * 更新role
   *
   * @param {TUpdateRoleData} data
   * @return {*}
   * @memberof Role
   */
  async updateRole(data: TUpdateRoleData) {
    return (await this.http.post('getPageRole', data)).data;
  }
}
