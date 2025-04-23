import { OrderStatus } from "~/types/OrderStatus";

export default (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PendingPayment:
      return "待支付";
    case OrderStatus.Paid:
      return "已支付";
    case OrderStatus.Processing:
      return "处理中";
    case OrderStatus.Shipped:
      return "已发货";
    case OrderStatus.Completed:
      return "已完成";
    case OrderStatus.Cancelled:
      return "已取消";
    case OrderStatus.Refunding:
      return "退款中";
    case OrderStatus.Refunded:
      return "已退款";
    default:
      return "未知状态";
  }
};
