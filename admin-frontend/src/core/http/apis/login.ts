import { AxiosInstance } from 'axios';
import { Api } from '../decorators/api';
import { IResponse } from './../IResponse';

type LoginRes = {
  userInfo: {
    avatar: string;
  };
};

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
