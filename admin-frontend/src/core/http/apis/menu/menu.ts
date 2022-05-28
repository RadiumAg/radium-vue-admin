import { Api } from '@core/http/decorators/api';
import { AxiosInstance } from 'axios';

@Api({ prefix: 'menu' })
export class Menu {
  private http: AxiosInstance;

  async getAll() {
    return (await this.http.get('getAll')).data;
  }
}
