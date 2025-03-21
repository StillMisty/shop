<template>
  <div class="h-full">
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <LoaderCircle class="animate-spin" :size="48" />
    </div>
    <div v-else v-if="order" class="p-16 gap-4">
      <el-card shadow="hover" class="max-w-2xl mx-auto">
        <OrderStatusSteps :orderStatus="order.orderStatus" />
      </el-card>
      <el-card> </el-card>
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
