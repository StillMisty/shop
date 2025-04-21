/**
 * ProductPageRequest
 */
export interface ProductPageRequest {
  /**
   * 页码
   */
  page: number;
  /**
   * 每页大小
   */
  size: number;
  /**
   * 排序字段
   */
  sortBy?: string;
  /**
   * 排序方向
   */
  sortDirection?: SortDirection;
}

/**
 * 排序方向
 */
export enum SortDirection {
  Asc = "ASC",
  Desc = "DESC",
}
