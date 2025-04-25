import { OrderStatus } from "~/types/OrderStatus";

export default (orderStatus: OrderStatus) => {
  return (
    orderStatus === OrderStatus.PendingPayment ||
    orderStatus === OrderStatus.Paid ||
    orderStatus === OrderStatus.Processing
  );
};
