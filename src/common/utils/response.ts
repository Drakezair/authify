export type IResponse<T> = {
  message?: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    next?: string;
    previous?: string;
  };
};

export const Response = <T>({
  message = 'SUCCESS',
  ...params
}: IResponse<T>) => ({ message, ...params });
