import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { AddressChangeRequest } from "~/types/DTO/AddressChangeRequest";
import type { ApiResponse } from "~/types/DTO/ApiResponse";
import type { CheckoutRequest } from "~/types/DTO/CheckoutRequest";
import type { Order } from "~/types/Order";

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
    const res = await $fetch<ApiResponse<Order>>(
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

  const updateOrderAddress = async (
    orderId: string,
    addressChangeRequest: AddressChangeRequest,
  ) => {
    const res = await $fetch<ApiResponse<Order>>(
      `${apiUrl}/api/orders/${orderId}/address`,
      {
        method: "PATCH",
        body: addressChangeRequest,
      },
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  };

  const cancelOrder = async (orderId: string) => {
    const res = await $fetch<ApiResponse<Order>>(
      `${apiUrl}/api/orders/${orderId}/status/cancelled`,
      {
        method: "PATCH",
      },
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  };

  const refundOrder = async (orderId: string) => {
    const res = await $fetch<ApiResponse<Order>>(
      `${apiUrl}/api/orders/${orderId}/status/refunding`,
      {
        method: "PATCH",
      },
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  };

  const completeOrder = async (orderId: string) => {
    const res = await $fetch<ApiResponse<Order>>(
      `${apiUrl}/api/orders/${orderId}/status/completed`,
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
    onSuccess: () => {
      ElMessage.success("支付订单成功");
    },
    onError: () => {
      ElMessage.error("支付订单失败，请稍后重试");
    },
    onSettled: () => {
      // 支付后，重新获取订单列表
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  /**
   * 更新订单地址
   * @param orderId 订单 ID
   * @param addressChangeRequest 地址变更请求
   */
  const updateOrderAddressMutation = useMutation({
    mutationFn: (params: {
      orderId: string;
      addressChangeRequest: AddressChangeRequest;
    }) => updateOrderAddress(params.orderId, params.addressChangeRequest),
    onSuccess: () => {
      ElMessage.success("更新订单地址成功");
    },
    onError: () => {
      // 处理错误情况
      ElMessage.error("修改地址失败：只能修改待支付、已支付或处理中订单的地址");
    },
    onSettled: () => {
      // 地址更新后，重新获取订单列表
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  /**
   * 取消订单
   * @param orderId 订单 ID
   */
  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      ElMessage.success("取消订单成功");
    },
    onError: () => {
      // 处理错误情况
      ElMessage.error("取消订单失败，请稍后重试");
    },
    onSettled: () => {
      // 取消订单后，重新获取订单列表
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  /**
   * 退款订单
   * @param orderId 订单 ID
   */
  const refundOrderMutation = useMutation({
    mutationFn: refundOrder,
    onSuccess: () => {
      ElMessage.success("退款订单成功");
    },
    onError: () => {
      // 处理错误情况
      ElMessage.error("退款订单失败，请稍后重试");
    },
    onSettled: () => {
      // 退款订单后，重新获取订单列表
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  /**
   * 完成订单
   * @param orderId 订单 ID
   */
  const completeOrderMutation = useMutation({
    mutationFn: completeOrder,
    onSuccess: () => {
      ElMessage.success("完成订单成功");
    },
    onError: () => {
      // 处理错误情况
      ElMessage.error("完成订单失败，请稍后重试");
    },
    onSettled: () => {
      // 完成订单后，重新获取订单列表
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
    updateOrderAddressMutation,
    cancelOrderMutation,
    refundOrderMutation,
    completeOrderMutation,
  };
}
