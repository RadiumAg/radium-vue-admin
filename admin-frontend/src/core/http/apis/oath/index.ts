import { Api } from '@core/http/decorators/api';
import type { IResponse } from '@core/http/type';
import type { AxiosInstance } from 'axios';

@Api({ prefix: 'oath' })
export class OAth {
  private http: AxiosInstance;

  /**
   * 登录
   *
   * @param {string} username
   * @param {string} password
   * @return {*}
   * @memberof OAth
   */
  async login(username: string, password: string) {
    return (
      await this.http.post<IResponse<never>>('login', {
        username,
        password,
      })
    ).data;
  }
}
