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
          v-if="order.orderStatus === OrderStatus.PendingPayment"
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
      {{ order.orderId }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { useOrder } from "~/api/useOrder";
import type { Order } from "~/types/Order";
import { OrderStatus } from "~/types/OrderStatus";

const { order } = defineProps<{
  order: Order;
}>();

const { payOrderMutation } = useOrder();

const handlePayOrder = async () => {
  ElMessageBox.confirm("是否确认支付订单？", "支付订单", {
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "支付",
    cancelButtonText: "取消",
  }).then(async () => {
    const orderId = order.orderId;
    await payOrderMutation.mutateAsync(orderId);
  });
};
</script>
