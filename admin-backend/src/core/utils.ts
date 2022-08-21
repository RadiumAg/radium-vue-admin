import { Result } from '@vo/result';

type DataType<T> = null | T;

export class AdminResponse {
    public static success<T>(msg = '获取成功', data?: DataType<T>) {
        const res = new Result(0, msg, data);
        return res;
    }

    public static error<T>(msg: string, code: number, data?: DataType<T>) {
        const res = new Result(code, msg, data);
        return res;
    }
}
