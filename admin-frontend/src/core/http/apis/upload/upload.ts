import { Api } from '@core/http/decorators/api';
import type { AxiosInstance } from 'axios';

@Api({ prefix: 'upload' })
export class Upload {
  private http: AxiosInstance;

  /**
   * 上传文件
   *
   * @param {File} file
   * @param {string} dir
   * @return {*}
   * @memberof Upload
   */
  async file(file: File, dir: string) {
    const formData = new FormData();
    formData.append('files', file);

    return (
      await this.http.post('file', formData, {
        params: {
          dir,
        },
      })
    ).data;
  }
}
