<template>
  <div class="max-w-7xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">我的订单</h1>
    <div v-if="orders.length" class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="border p-4 rounded-lg shadow">
        <h2 class="text-xl font-semibold">订单号: {{ order.id }}</h2>
        <p>总金额: ￥{{ order.total }}</p>
        <p>状态: {{ order.status }}</p>
        <router-link :to="`/orders/${order.id}`" class="text-blue-500">查看详情</router-link>
      </div>
    </div>
    <div v-else>
      <el-empty description="您还没有订单" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useOrderApi } from '@/composables/useOrderApi';

const orders = ref([]);

const fetchOrders = async () => {
  const orderApi = useOrderApi();
  orders.value = await orderApi.getOrders();
};

onMounted(fetchOrders);
</script>

<style scoped>
/* Add any specific styles for the orders page here */
</style>