<template>
  <el-descriptions
    title="订单信息"
    border
    size="large"
    class="w-full max-w-3xl"
  >
    <template #extra>
      <div class="flex gap-4 items-center">
        <OrderStatusTag :orderStatus="order.orderStatus" />
        <el-button type="primary">支付订单</el-button>
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
import type { OrderType } from "~/types/OrderType";

defineProps<{
  order: OrderType;
}>();
</script>
