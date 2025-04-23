<template>
  <el-steps :active="active" finish-status="success" align-center>
    <el-step :title="getOrderStatusLabel(OrderStatus.PendingPayment)" />
    <el-step :title="getOrderStatusLabel(OrderStatus.Paid)" />
    <el-step :title="getOrderStatusLabel(OrderStatus.Processing)" />
    <el-step :title="getOrderStatusLabel(OrderStatus.Shipped)" />
    <el-step :title="getOrderStatusLabel(OrderStatus.Completed)" />
  </el-steps>
</template>

<script lang="ts" setup>
import { OrderStatus } from "~/types/OrderStatus";

const props = defineProps<{ orderStatus: OrderStatus }>();
const active = computed(() => {
  switch (props.orderStatus) {
    case OrderStatus.PendingPayment:
      return 1;
    case OrderStatus.Paid:
      return 2;
    case OrderStatus.Processing:
      return 3;
    case OrderStatus.Shipped:
      return 4;
    case OrderStatus.Completed:
      return 5;
    default:
      return 0;
  }
});
</script>
