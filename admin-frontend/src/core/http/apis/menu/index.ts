import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/type';
import type { AxiosInstance } from 'axios';
import type { GetAllRes, GetById, InsertMenuData, UpdateMenu } from './types';

@Api({ prefix: 'menu' })
export class Menu {
  private http: AxiosInstance;

  /**
   * 通过Id删除菜单
   *
   * @param {string} _id
   * @return {*}
   * @memberof Menu
   */
  async deleteById(_id: string) {
    return (await this.http.post<IResponse<GetAllRes[]>>('deleteById', { _id }))
      .data;
  }

  /**
   * 获得所有菜单
   *
   * @return {*}
   * @memberof Menu
   */
  async getAllMenu() {
    return (await this.http.get<IResponse<GetAllRes[]>>('getAllMenu')).data;
  }

  /**
   * 插入菜单
   *
   * @param {TInsertMenuData} data
   * @return {*}
   * @memberof Menu
   */
  async insertMenu(data: InsertMenuData) {
    return (await this.http.post('insertMenu', data)).data;
  }

  /**
   * 更新菜单
   *
   * @param {TUpdateMenu} data
   * @return {*}
   * @memberof Menu
   */
  async updateMenu(data: UpdateMenu) {
    return (await this.http.post('updateMenu', data)).data;
  }

  /**
   * 根据Id获得菜单
   *
   * @param {string} id
   * @return {*}
   * @memberof Menu
   */
  async getById(id: string) {
    return (
      await this.http.get<IResponse<GetById>>('getById', { params: { id } })
    ).data;
  }
}
