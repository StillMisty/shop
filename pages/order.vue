<template>
  <div
    class="flex justify-center items-center p-16 max-w-7xl mx-auto w-full"
    v-loading="orderStore.loading"
  >
    <div v-if="orderStore.orders.length === 0">
      <el-empty description="暂无订单" />
    </div>
    <OrderTable v-else />
  </div>
</template>

<script lang="ts" setup>
const orderStore = useMyOrderStore();
onMounted(() => {
  orderStore.fetchOrders();
});
</script>
