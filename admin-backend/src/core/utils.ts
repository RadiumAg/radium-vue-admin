import { Result } from '@vo/Result';

type DataType<T> = null | T;

export class Response {
  public static success<T>(data?: DataType<T>, msg = '') {
    const res = new Result(0, msg, data);
    return res;
  }

  public static error<T>(msg: string, code: number, data?: DataType<T>) {
    const res = new Result(0, msg, data);
    return res;
  }
}
