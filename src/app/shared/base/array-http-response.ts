export interface ArrayHttpResponse<T> {
  data: T[];
  meta: {
    total: number;
    last_page: number;
    current_page: number;
  };
}
