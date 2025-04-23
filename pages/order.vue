<template>
  <div class="h-full">
    <div v-if="isPending" class="flex items-center justify-center h-full">
      <LoaderCircle :size="64" class="animate-spin" />
    </div>
    <div
      v-else-if="isError"
      class="flex flex-col items-center justify-center h-full text-red-500"
    >
      <div class="flex mr-2"><TriangleAlert />加载失败，请稍后再试</div>
      <p>{{ error?.message }}</p>
      <RefreshCw
        :size="36"
        class="mt-2 cursor-pointer transition-all hover:rotate-180"
        @click="handleRefresh"
      />
    </div>
    <div v-if="orders" class="grid gap-4 p-16 max-w-7xl mx-auto">
      <OrderTable :orders="orders" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle, TriangleAlert, RefreshCw } from "lucide-vue-next";
import { useOrder } from "~/api/useOrder";

// 需要登录才能访问
definePageMeta({
  requiresAuth: true,
});

const { orderQuery } = useOrder();

const { isPending, isError, error, data: orders } = orderQuery;

const handleRefresh = () => {
  orderQuery.refetch();
};
</script>
