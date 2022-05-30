import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/IResponse';
import type { AxiosInstance } from 'axios';
import type { TGetLoginUserInfo } from './models/TGetLoginUserInfo';

@Api({ prefix: 'user' })
export class User {
  private http: AxiosInstance;

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
}
