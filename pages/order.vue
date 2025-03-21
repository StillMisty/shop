<template>
  <div>
    <div
      v-if="data"
      class="flex justify-center items-center p-16 max-w-7xl mx-auto w-full"
    >
      <div v-if="data.length === 0">
        <el-empty description="暂无订单" />
      </div>
      <OrderTable v-else :orders="data" @info="handleInfo" />
    </div>
    <div v-if="order" class="flex flex-col items-center p-16 gap-8">
      <el-card class="w-full max-w-2xl">
        <OrderStatusSteps :orderStatus="order.orderStatus" />
      </el-card>
      <ReceivingInfoDescriptions :receivingInfo="order.receivingInfo">
      </ReceivingInfoDescriptions>
      <OrderCard
        :order="order"
        @update-order-status="handleUpdateOrderStatus"
      ></OrderCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import orderInfo from "~/pages/orderInfo.vue";
import type { UpdateOrderStatusDto } from "~/types/DTO/OrderDtoType";
import type { OrderType } from "~/types/OrderType";

const orderStore = useMyOrderStore();
await orderStore.fetchOrders();
const { orders } = storeToRefs(orderStore);
const data = orders;

const order = ref<OrderType | null>(null);
const handleInfo = (id: string) => {
  orderStore.fetchOrders();
  const foundOrder = orders.value.find((order) => order.id === id);
  order.value = foundOrder || null;
};

const handleUpdateOrderStatus = async (
  updateOrderStatusDto: UpdateOrderStatusDto,
) => {
  await orderStore.updateOrder(updateOrderStatusDto);
  const foundOrder = orders.value.find(
    (order) => order.id === updateOrderStatusDto.orderId,
  );
  order.value = foundOrder || null;
};
</script>
