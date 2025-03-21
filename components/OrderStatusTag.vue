<template>
  <el-tag :type="getTagType(orderStatus)">
    {{ orderStatus }}
  </el-tag>
</template>

<script lang="ts" setup>
import { OrderStatus } from "~/types/OrderType";

defineProps({
  orderStatus: {
    type: String as PropType<OrderStatus>,
    required: true,
  },
});

const getTagType = (orderStatus: OrderStatus) => {
  switch (orderStatus) {
    case OrderStatus.PENDING_PAYMENT:
      return "warning";
    case OrderStatus.PAID || OrderStatus.SHIPPED || OrderStatus.COMPLETED:
      return "success";
    default:
      return "info";
  }
};
</script>
