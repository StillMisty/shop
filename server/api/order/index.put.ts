import { ApiResponse } from "~/types/DTO/ApiResponse";
import { UpdateOrderStatusDto } from "~/types/DTO/OrderDtoType";
import { OrderType } from "~/types/OrderType";

/**
 * 修改订单状态
 */
export default defineEventHandler(async (event) => {
  const body: UpdateOrderStatusDto = await readBody(event);

  const order = (await useStorage().getItem(
    `order:${body.orderId}`,
  )) as OrderType;
  if (!order) {
    return ApiResponse.fail("订单不存在");
  }

  order.orderStatus = body.newStatus;
  await useStorage().setItem(`order:${body.orderId}`, order);

  return ApiResponse.success(order);
});
