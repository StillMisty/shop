import type { OrderType } from "~/types/OrderType";

export const useMyOrderStore = defineStore("myOrderStore", () => {
  const orders = ref<OrderType[]>([]);

  /**
   * 获取订单列表
   * @returns 订单列表
   */
  const fetchOrders = async () => {
    const { data } = await useFetch("/api/order", {
      method: "GET",
    });
    if (data.value?.success) {
      orders.value = data.value.data.map((order: any) => ({
        ...order,
        orderItems: order.orderItems.map((item: any) => ({
          product: item.product,
          quantity: item.quantity,
        })),
      }));
    }
  };
});
