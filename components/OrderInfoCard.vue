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
          type="info"
          plain
          @click="handleCancelOrder"
          >取消订单</el-button
        >
        <el-button
          v-if="order.orderStatus === OrderStatus.Paid"
          type="info"
          plain
          @click="handleRefundOrder"
          >申请退款</el-button
        >
        <el-button
          v-if="order.orderStatus === OrderStatus.PendingPayment"
          type="primary"
          @click="handlePayOrder"
          >支付订单</el-button
        >
        <el-button
          v-if="order.orderStatus === OrderStatus.Shipped"
          type="primary"
          @click="handleConfirmReceive"
          >确认收货</el-button
        >
      </div>
    </template>
    <el-descriptions-item label="订单号" :span="3">
      {{ order.orderId }}
    </el-descriptions-item>
    <el-descriptions-item label="下单时间">
      {{ new Date(order.orderTime).toLocaleString() }}
    </el-descriptions-item>
    <el-descriptions-item v-if="order.payTime" label="付款时间">
      {{ new Date(order.payTime).toLocaleString() }}
    </el-descriptions-item>
    <el-descriptions-item label="商品总价">
      <PriceDisplay :price="order.totalAmount" />
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import PriceDisplay from "./PriceDisplay.vue";
import { useOrder } from "~/api/useOrder";
import type { Order } from "~/types/Order";
import { OrderStatus } from "~/types/OrderStatus";

const { order } = defineProps<{
  order: Order;
}>();

const {
  payOrderMutation,
  cancelOrderMutation,
  refundOrderMutation,
  completeOrderMutation,
} = useOrder();

const handleCancelOrder = async () => {
  ElMessageBox.confirm("是否确认取消订单？", "取消订单", {
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "取消",
    cancelButtonText: "不取消",
  }).then(async () => {
    const orderId = order.orderId;
    await cancelOrderMutation.mutateAsync(orderId);
  });
};

const handleRefundOrder = async () => {
  ElMessageBox.confirm("是否确认申请退款？", "申请退款", {
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "申请",
    cancelButtonText: "不申请",
  }).then(async () => {
    const orderId = order.orderId;
    await refundOrderMutation.mutateAsync(orderId);
  });
};

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

const handleConfirmReceive = async () => {
  ElMessageBox.confirm("是否确认收货？", "确认收货", {
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "确认",
    cancelButtonText: "不确认",
  }).then(async () => {
    const orderId = order.orderId;
    await completeOrderMutation.mutateAsync(orderId);
  });
};
</script>
