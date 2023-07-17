import { Api } from '@core/http/decorators/api';
import type { AxiosInstance, AxiosProgressEvent } from 'axios';

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
  async file(
    file: Blob,
    filename: string,
    uploadProgressFn: (event: AxiosProgressEvent) => void,
  ) {
    const formData = new FormData();
    formData.append('files', file);

    return (
      await this.http.post('file', formData, {
        params: {
          filename,
        },
        onUploadProgress(event: AxiosProgressEvent) {
          uploadProgressFn(event);
        },
      })
    ).data;
  }

  /**
   * 合并文件
   *
   * @param {string} filename
   * @param {number} size
   * @return {*}
   * @memberof Upload
   */
  async merge(filename: string, size: number) {
    return (await this.http.get('merge', { params: { filename, size } })).data;
  }
}
