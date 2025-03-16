import { productCardList } from "~/server/data";
import { ApiResponse } from "~/types/DTO/ApiResponse";
import type { CreateOrderDto } from "~/types/DTO/OrderDtoType";
import { OrderType, OrderStatus } from "~/types/OrderType";

export default defineEventHandler(async (event) => {
  const body: CreateOrderDto = await readBody(event);

  // 生成唯一ID
  const id = Date.now().toString();
  const orderTime = new Date().toISOString();

  const productMap = new Map(
    productCardList.map((product) => [product.id, product]),
  );

  // 保存订单数据
  const orderItems = body.orderItems
    .filter((item) => productMap.has(item.productId))
    .map((item) => {
      return {
        product: productMap.get(item.productId)!,
        quantity: item.quantity,
      };
    });

  const orderTotal = body.orderItems.reduce((acc, item) => {
    const product = productMap.get(item.productId);
    return acc + (product ? product.price * item.quantity : 0);
  }, 0);

  const order: OrderType = {
    id,
    orderTime,
    orderStatus: OrderStatus.PENDING_PAYMENT,
    orderTotal,
    orderItems,
  };

  // 使用Nuxt内置的存储功能
  await useStorage().setItem(`order:${id}`, order);

  return ApiResponse.success(order);
});
