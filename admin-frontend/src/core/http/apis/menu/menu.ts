import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/IResponse';
import type { AxiosInstance } from 'axios';
import type { TGetAllRes } from './models/TGetAllRes';
import type { TGetById } from './models/TGetByIdRes';
import type { TInsertMenuData } from './models/TInsertMenuData';
import type { TUpdateMenu } from './models/TUpdateMenu';

@Api({ prefix: 'menu' })
export class Menu {
  private http: AxiosInstance;

  /**
   * 获得所有菜单
   *
   * @return {*}
   * @memberof Menu
   */
  async getAllMenu() {
    return (await this.http.get<IResponse<TGetAllRes[]>>('getAllMenu')).data;
  }

  /**
   * 插入菜单
   *
   * @param {TInsertMenuData} data
   * @return {*}
   * @memberof Menu
   */
  async insertMenu(data: TInsertMenuData) {
    return (await this.http.post('insertMenu', data)).data;
  }

  /**
   * 更新菜单
   *
   * @param {TUpdateMenu} data
   * @return {*}
   * @memberof Menu
   */
  async updateMenu(data: TUpdateMenu) {
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
      await this.http.get<IResponse<TGetById>>('getById', { params: { id } })
    ).data;
  }
}
