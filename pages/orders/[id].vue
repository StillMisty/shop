<template>
  <div class="h-full">
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <LoaderCircle class="animate-spin" :size="48" />
    </div>
    <div v-else v-if="order" class="flex flex-col items-center p-16 gap-8">
      <el-card class="w-full max-w-2xl">
        <OrderStatusSteps :orderStatus="order.orderStatus" />
      </el-card>
      <ReceivingInfoDescriptions :receivingInfo="order.receivingInfo">
      </ReceivingInfoDescriptions>
      <OrderCard :order="order"></OrderCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";
import { useOrder } from "~/api/useOrder";
import { OrderStatus } from "~/types/OrderType";

const route = useRoute();
const orderId = route.params.id as string;

const { orderQuery } = useOrder();
const { data: order, isLoading } = await orderQuery(orderId);
</script>
