import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryFilters,
} from "@tanstack/vue-query";
import { ApiResponse } from "~/types/DTO/ApiResponse";
import type {
  CreateOrderDto,
  UpdateOrderStatusDto,
} from "~/types/DTO/OrderDtoType";
import type { OrderType } from "~/types/OrderType";

export function useOrder() {
  const queryClient = useQueryClient();

  const apiUrl = useRuntimeConfig().public.apiUrl;

  const fetchOrders = async () => {
    const data = await $fetch<ApiResponse<Array<OrderType>>>(`${apiUrl}/order`);
    return ApiResponse.handleApiResponse(data);
  };

  const fetchOrder = async (postId: string) => {
    const data = await $fetch<ApiResponse<OrderType>>(
      `${apiUrl}/order/${postId}`,
    );
    return ApiResponse.handleApiResponse(data);
  };

  const createOrder = async (order: CreateOrderDto) => {
    const data = await $fetch<ApiResponse<OrderType>>(`${apiUrl}/order`, {
      method: "POST",
      body: order,
    });
    return ApiResponse.handleApiResponse(data);
  };

  const updateOrder = async (order: UpdateOrderStatusDto) => {
    const data = await $fetch<ApiResponse<OrderType>>(`${apiUrl}/order`, {
      method: "PUT",
      body: order,
    });
    return ApiResponse.handleApiResponse(data);
  };

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const orderQuery = async (orderId: string) => {
    return useQuery({
      queryKey: ["order", orderId],
      queryFn: () => fetchOrder(orderId),
    });
  };

  const orderUpdate = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data: OrderType) => {
      console.log("orderUpdate onSuccess", data);

      queryClient.setQueriesData(["order", data.id] as QueryFilters, data);
    },
  });

  return {
    ordersQuery,
    orderQuery,
    orderUpdate,
  };
}
