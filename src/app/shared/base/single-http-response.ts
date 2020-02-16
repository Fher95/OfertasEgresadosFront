export interface SingleHttpResponse<T> {
  data: T;
  status: string;
  status_code: number;
  message: string;
}
