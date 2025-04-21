<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ product.productName }}</h1>
    <p class="text-gray-700 mb-2">{{ product.productDescription }}</p>
    <p class="text-lg font-semibold mb-4">价格: ￥{{ product.productPrice.toFixed(2) }}</p>
    <p class="text-sm text-gray-500 mb-4">销量: {{ product.productSoldCount }} 件</p>
    <p class="text-sm text-gray-500 mb-4">库存: {{ product.productStock }} 件</p>
    <el-button type="primary" @click="addToCart">加入购物车</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductApi } from '@/composables/useProductApi';
import { Product } from '@/types/Product';

const route = useRoute();
const { getProductDetails } = useProductApi();
const product = ref<Product | null>(null);

onMounted(async () => {
  const productId = route.params.id as string;
  product.value = await getProductDetails(productId);
});

const addToCart = () => {
  // Logic to add the product to the shopping cart
};
</script>

<style scoped>
/* Add any additional styles here */
</style>