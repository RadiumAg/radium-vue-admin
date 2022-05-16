import { Result } from '@vo/Result';

type DataType<T> = null | T;

export class AdminResponse {
    public static success<T>(msg = '', data?: DataType<T>) {
        const res = new Result(0, msg, data);
        return res;
    }

    public static error<T>(msg: string, code: number, data?: DataType<T>) {
        const res = new Result(code, msg, data);
        return res;
    }
}
