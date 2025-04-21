export interface Order {
  /**
   * 订单 ID
   */
  orderId: string;
  /**
   * 用户 ID
   */
  userId: string;
  /**
   * 商品列表
   */
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  /**
   * 订单总价
   */
  orderTotal: number;
  /**
   * 订单状态
   */
  orderStatus: 'pending' | 'completed' | 'canceled';
  /**
   * 创建时间
   */
  createdAt: number;
  /**
   * 更新时间
   */
  updatedAt: number;
}