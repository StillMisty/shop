<template>
  <el-descriptions
    title="订单信息"
    border
    size="large"
    class="w-full max-w-3xl"
  >
    <template #extra>
      <div class="flex gap-4 items-center">
        <OrderStatusTag :order-status="order.orderStatus" />
        <el-button
          v-if="order.orderStatus === OrderStatus.PENDING_PAYMENT"
          type="primary"
          @click="handlePayOrder"
          >支付订单</el-button
        >
      </div>
    </template>
    <el-descriptions-item label="下单时间">
      {{ new Date(order.orderTime).toLocaleString() }}
    </el-descriptions-item>
    <el-descriptions-item label="订单号">
      {{ order.id }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { useOrder } from "~/api/useOrder";
import type { UpdateOrderStatusDto } from "~/types/DTO/OrderDtoType";
import { OrderStatus, type OrderType } from "~/types/OrderType";

const { order } = defineProps<{
  order: OrderType;
}>();

const updateOrderStatusDto = computed(
  (): UpdateOrderStatusDto => ({
    orderId: order.id,
    newStatus: OrderStatus.PAID,
  }),
);

const { orderUpdate } = useOrder();
const handlePayOrder = () => {
  orderUpdate.mutate(updateOrderStatusDto.value);
};
</script>
