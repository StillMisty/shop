import { OrderType } from "~/types/OrderType";

export default defineEventHandler(async (event) => {
  const storage = useStorage();

  // 获取所有以order:开头的键
  const keys = await storage.getKeys("order");

  // 获取所有order的数据
  const order = await Promise.all(
    keys.map(async (key) => {
      const data = (await storage.getItem(key)) || {};
      return data as OrderType;
    }),
  );

  return {
    success: true,
    data: order,
  };
});
