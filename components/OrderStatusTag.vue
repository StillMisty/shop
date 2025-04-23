<template>
  <el-tag :type="getTagType(orderStatus)">
    {{ getOrderStatusLabel(orderStatus) }}
  </el-tag>
</template>

<script lang="ts" setup>
import { OrderStatus } from "~/types/OrderStatus";

defineProps<{
  orderStatus: OrderStatus;
}>();

const getTagType = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case OrderStatus.PendingPayment:
      return "warning";
    case OrderStatus.Paid || OrderStatus.Shipped || OrderStatus.Completed:
      return "success";
    default:
      return "info";
  }
};
</script>
