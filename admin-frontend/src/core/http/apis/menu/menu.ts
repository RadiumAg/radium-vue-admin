import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/IResponse';
import type { AxiosInstance } from 'axios';
import type { GetAllRes } from './models/TGetAllRes';

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
    return (await this.http.get<IResponse<GetAllRes[]>>('getAllMenu')).data;
  }
}
