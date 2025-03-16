import { OrderStatus } from "../OrderType";

// 创建订单时的请求 DTO
export type CreateOrderDto = {
  orderItems: {
    productId: string;
    quantity: number;
  }[];
};

// 订单响应 DTO
export type OrderResponseDto = {
  id: string;
  orderTime: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  orderItems: OrderItemType[];
};

// 更新订单状态 DTO
export type UpdateOrderStatusDto = {
  orderId: string;
  newStatus: OrderStatus;
};
