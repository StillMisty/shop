export interface CartItemChangeRequest {
  /**
   * 商品 ID
   */
  productId: string;
  /**
   * 要修改到的数量
   */
  quantity: number;
  /**
   * 是否增量修改
   * @default false
   * @description 如果为 true，则 quantity 表示增量修改的数量；如果为 false，则 quantity 表示要修改到的数量。
   */
  increment?: boolean;
}
