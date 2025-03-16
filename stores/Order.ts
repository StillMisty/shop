import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { UpdateOrderStatusDto } from "~/types/DTO/OrderDtoType";
import type { OrderType } from "~/types/OrderType";

export const useMyOrderStore = defineStore("myOrderStore", () => {
  const loading = ref(true);
  const orders = ref<OrderType[]>([]);

  /**
   * 通用加载处理函数，自动管理loading状态
   * @param action 要执行的异步操作
   * @returns 异步操作的结果
   */
  const withLoading = async <T>(action: () => Promise<T>): Promise<T> => {
    loading.value = true;
    try {
      return await action();
    } finally {
      loading.value = false;
    }
  };
  /**
   * 获取订单列表
   * @returns 订单列表
   */
  const fetchOrders = async () => {
    const res = await withLoading(async () => {
      return await $fetch<ApiResponse>("/api/order", {
        method: "GET",
      });
    });
    if (res.success) {
      orders.value = res.data as OrderType[];
      console.log(orders.value);
    }
  };

  /**
   * 更新订单状态
   * @param order 订单状态
   */
  const updateOrder = async (order: UpdateOrderStatusDto) => {
    const result = await $fetch<ApiResponse>("/api/order", {
      method: "PUT",
      body: order,
    });
    console.log(result.data);

    if (result.success) {
      await fetchOrders();
    }
  };

  return {
    loading,
    orders,
    fetchOrders,
    updateOrder,
  };
});
