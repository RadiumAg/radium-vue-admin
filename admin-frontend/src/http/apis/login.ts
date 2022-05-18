import { AxiosInstance } from 'axios';
import { Api } from '../decorators/api';

type LoginRes = {
  userInfo: {
    avatar: string;
  };
};

@Api({ prefix: 'OAth' })
export class OAth {
  private http: AxiosInstance;

  /**
   * 登录
   *
   * @param {string} account
   * @param {string} password
   * @return {*}
   * @memberof OAth
   */
  async login(account: string, password: string) {
    return (
      await this.http.post<LoginRes>('login', {
        account,
        password,
      })
    ).data;
  }
}
