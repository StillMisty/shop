import type { OrderItem } from "./OrderItem";
import type { OrderStatus } from "./OrderStatus";

export interface Order {
  /**
   * 收货地址
   */
  address: string;
  /**
   * 收件人姓名
   */
  name: string;
  /**
   * 订单 ID
   */
  orderId: string;
  /**
   * 订单商品列表
   */
  orderItems: OrderItem[];
  /**
   * 订单状态
   */
  orderStatus: OrderStatus;
  /**
   * 下单时间
   */
  orderTime: number;
  /**
   * 支付时间
   */
  payTime: number;
  /**
   * 收件人电话
   */
  phone: string;
  /**
   * 订单总金额
   */
  totalAmount: number;
}
