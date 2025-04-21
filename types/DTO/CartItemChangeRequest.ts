export interface CartItemChangeRequest {
  /**
   * 商品 ID
   */
  productId: string;
  /**
   * 要修改到的数量
   */
  quantity: number;
}
