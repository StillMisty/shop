import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { CheckoutRequest } from "~/types/DTO/CheckoutRequest";
import type { OrderItem } from "~/types/OrderItem";

export function useOrder() {
  const queryClient = useQueryClient();

  const apiUrl = useRuntimeConfig().public.apiUrl;

  const fetchOrders = async () => {
    const res = await $fetch<ApiResponse<OrderItem>>(`${apiUrl}/api/orders`, {
      method: "GET",
    });
    if (!res.success) {
      // 处理错误情况
      console.error("获取数据失败:", res.message);
      throw new Error(res.message);
    }
    return res.data;
  };

  const checkOrder = async (checkoutRequest: CheckoutRequest) => {
    const res = await $fetch<ApiResponse<OrderItem>>(
      `${apiUrl}/api/orders/checkout`,
      {
        method: "POST",
        body: checkoutRequest,
      },
    );
    if (!res.success) {
      // 处理错误情况
      console.error("获取数据失败:", res.message);
      throw new Error(res.message);
    }
    return res.data;
  };

  const orderQuery = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  /**
   * 根据购物车生成订单
   * @param CheckoutRequest 结账请求
   */
  const checkOrderMutation = useMutation({
    mutationFn: checkOrder,
    onError: (error) => {
      // 处理错误情况
      console.error("创建订单失败:", error);
    },
    onSettled: () => {
      // 订单创建后，重新获取订单列表
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  return {
    orderQuery,
    checkOrderMutation,
  };
}
