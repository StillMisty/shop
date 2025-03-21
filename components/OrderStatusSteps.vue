<template>
  <el-steps :active="active" finish-status="success" align-center>
    <el-step :title="OrderStatus.PENDING_PAYMENT" />
    <el-step :title="OrderStatus.PAID" />
    <el-step :title="OrderStatus.PROCESSING" />
    <el-step :title="OrderStatus.SHIPPED" />
    <el-step :title="OrderStatus.COMPLETED" />
  </el-steps>
</template>

<script lang="ts" setup>
import { OrderStatus } from "~/types/OrderType";

const props = defineProps<{ orderStatus: OrderStatus }>();
const active = computed(() => {
  switch (props.orderStatus) {
    case OrderStatus.PENDING_PAYMENT:
      return 1;
    case OrderStatus.PAID:
      return 2;
    case OrderStatus.PROCESSING:
      return 3;
    case OrderStatus.SHIPPED:
      return 4;
    case OrderStatus.COMPLETED:
      return 5;
    default:
      return 0;
  }
});
</script>
