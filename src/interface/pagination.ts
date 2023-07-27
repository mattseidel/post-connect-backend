export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  totalCount: number;
  page: number;
  limit: number;
  data: T[];
}
