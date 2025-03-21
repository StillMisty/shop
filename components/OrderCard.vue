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
        <el-button
          type="primary"
          v-if="order.orderStatus === OrderStatus.PENDING_PAYMENT"
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
    <el-descriptions-item label="合计">
      <PriceDisplay :price="order.orderTotal" />
    </el-descriptions-item>
  </el-descriptions>
  <el-card class="w-full max-w-4xl">
    <el-divider>商品信息</el-divider>
    <el-row class="gap-4">
      <ProductDisplay
        v-for="item in order.orderItems"
        :key="item.product.id"
        :image="item.product.image"
        :name="item.product.name"
        :quantity="item.quantity"
      />
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import type { UpdateOrderStatusDto } from "~/types/DTO/OrderDtoType";
import { OrderStatus, type OrderType } from "~/types/OrderType";

const emit = defineEmits(["updateOrderStatus"]);

const { order } = defineProps<{
  order: OrderType;
}>();

const updateOrderStatusDto = computed(
  (): UpdateOrderStatusDto => ({
    orderId: order.id,
    newStatus: OrderStatus.PAID,
  }),
);

const handlePayOrder = async () => {
  emit("updateOrderStatus", updateOrderStatusDto.value);
};
</script>
