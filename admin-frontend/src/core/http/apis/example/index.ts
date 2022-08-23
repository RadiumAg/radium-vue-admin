import { Api } from '@core/http/decorators/api';
import type { IResponse } from './../../type';
import type { AxiosInstance } from 'axios';
import type { GetExampleUsers } from './types';

@Api({ prefix: 'example' })
export class Example {
  private http: AxiosInstance;

  /**
   * 获得测试用户信息
   *
   * @return {*}
   * @memberof Example
   */
  async getExampleUsers() {
    return (await this.http.get<IResponse<GetExampleUsers>>('getExampleUsers'))
      .data;
  }
}
