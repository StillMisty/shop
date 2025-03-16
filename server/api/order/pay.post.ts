import { UpdateOrderStatusDto } from "~/types/DTO/OrderDtoType";

/**
 * @swagger
 * /order/pay:
 *   post:
 *    summary: 支付订单
 */
export default defineEventHandler(async (event) => {
  const body: UpdateOrderStatusDto = await readBody(event);
  // 使用Nuxt内置的存储功能
  await useStorage().setItem(`settlements:${body.orderId}`, {
    ...useStorage().getItem(`settlements:${body.orderId}`),
    orderStatus: body.newStatus,
  });

  return {
    success: true,
  };
});
