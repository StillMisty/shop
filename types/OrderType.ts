import type { ProductCardType } from "./ProductCardType";
import type { ReceivingInfoType } from "./ReceivingInfoType";

type OrderItemType = {
  product: ProductCardType;
  quantity: number;
};

export enum OrderStatus {
  PENDING_PAYMENT = "待支付",
  PAID = "已支付",
  PROCESSING = "处理中",
  SHIPPED = "已发货",
  COMPLETED = "已完成",
  CANCELLED = "已取消",
  REFUNDING = "退款中",
  REFUNDED = "已退款",
}

export type OrderType = {
  id: string;
  orderTime: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  orderItems: OrderItemType[];
  receivingInfo: ReceivingInfoType;
};
