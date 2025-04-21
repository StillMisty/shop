<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">订单详情</h1>
    <div v-if="order">
      <div class="mb-4">
        <h2 class="text-xl font-semibold">订单号: {{ order.id }}</h2>
        <p>总金额: ￥{{ order.totalPrice }}</p>
        <p>下单时间: {{ formatDate(order.orderDate) }}</p>
      </div>
      <div class="border-t border-gray-300 pt-4">
        <h3 class="text-lg font-semibold">商品列表</h3>
        <ul>
          <li v-for="item in order.items" :key="item.productId" class="flex justify-between py-2">
            <span>{{ item.productName }}</span>
            <span>数量: {{ item.quantity }}</span>
            <span>价格: ￥{{ item.price }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getOrderById } from '@/composables/useOrderApi';
import { Order } from '@/types/Order';
import { formatDate } from '@/utils/format';

const route = useRoute();
const order = ref<Order | null>(null);

onMounted(async () => {
  const orderId = route.params.id;
  order.value = await getOrderById(orderId);
});
</script>

<style scoped>
/* Add any specific styles for the order details page here */
</style>