import { ApiResponse } from "~/types/DTO/ApiResponse";
import { OrderType } from "~/types/OrderType";

export default defineEventHandler(async () => {
  const storage = useStorage();

  // 获取所有以order:开头的键
  const keys = await storage.getKeys("order:");

  // 获取所有order的数据并转化为OrderType
  const order = await Promise.all(
    keys.map(async (key) => {
      const data = await storage.getItem<OrderType>(key);
      return data;
    }),
  );

  return ApiResponse.success(order);
});
