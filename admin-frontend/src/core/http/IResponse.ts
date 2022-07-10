export type IResponse<T = Record<string, any>> = {
  msg: string;
  data: T;
};
