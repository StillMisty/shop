<template>
  <div class="h-full">
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <LoaderCircle class="animate-spin" :size="48" />
    </div>
    <div v-else-if="order" class="flex flex-col items-center p-16 gap-8">
      <el-card class="w-full max-w-2xl">
        <OrderStatusSteps :order-status="order.orderStatus" />
      </el-card>
      <ReceivingInfoDescriptions :receiving-info="order">
      </ReceivingInfoDescriptions>
      <OrderCard :order="order"></OrderCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";
import { useOrder } from "~/api/useOrder";

const route = useRoute();
const orderId = route.params.id as string;

const { orderByIdQuery } = useOrder();
const { isLoading, data: order } = orderByIdQuery(orderId);
</script>
