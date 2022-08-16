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
  async file(
    file: Blob,
    filename: string,
    uploadProgressFn: (event: ProgressEvent) => void,
  ) {
    const formData = new FormData();
    formData.append('files', file);

    return (
      await this.http.post('file', formData, {
        params: {
          filename,
        },
        onUploadProgress(event: ProgressEvent) {
          uploadProgressFn(event);
        },
      })
    ).data;
  }
}
