import { ApiResponse } from "~/types/DTO/ApiResponse";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const order = await useStorage().getItem(`order:${id}`);
  if (!order) {
    return ApiResponse.fail("无效的订单ID");
  }
  return ApiResponse.success(order);
});
