import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { CheckoutRequest } from "~/types/DTO/CheckoutRequest";
import type { Order } from "~/types/Order";
import type { OrderItem } from "~/types/OrderItem";

export function useOrder() {
  const queryClient = useQueryClient();

  const apiUrl = useRuntimeConfig().public.apiUrl;

  const fetchOrders = async () => {
    const res = await $fetch<ApiResponse<Order[]>>(`${apiUrl}/api/orders`, {
      method: "GET",
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  };

  const fetchOrderById = async (orderId: string) => {
    const res = await $fetch<ApiResponse<Order>>(
      `${apiUrl}/api/orders/${orderId}`,
      {
        method: "GET",
      },
    );
    if (!res.success) {
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
      throw new Error(res.message);
    }
    return res.data;
  };

  const payOrder = async (orderId: string) => {
    const res = await $fetch<ApiResponse<Order>>(
      `${apiUrl}/api/orders/${orderId}/payment`,
      {
        method: "PATCH",
      },
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  };

  const orderQuery = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const orderByIdQuery = (orderId: string) => {
    return useQuery({
      queryKey: ["orders", orderId],
      queryFn: () => fetchOrderById(orderId),
      enabled: !!orderId, // 只有在 orderId 存在时才执行查询
    });
  };

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

  /**
   * 支付订单
   * @param orderId 订单 ID
   */
  const payOrderMutation = useMutation({
    mutationFn: payOrder,
    onError: (error) => {
      // 处理错误情况
      console.error("支付订单失败:", error);
    },
    onSettled: () => {
      // 支付后，重新获取订单列表
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  return {
    orderQuery,
    checkOrderMutation,
    orderByIdQuery,
    payOrderMutation,
  };
}
