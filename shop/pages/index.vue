<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">欢迎来到我们的商店</h1>
    <p class="mb-6">浏览我们最新的商品和优惠。</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- 这里可以添加推荐商品的组件 -->
      <ProductCartCard v-for="product in recommendedProducts" :key="product.productId" :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductCartCard from '@/components/product/ProductCartCard.vue';
import { ref } from 'vue';

const recommendedProducts = ref([
  // 示例商品数据
  {
    productId: '1',
    productName: '商品一',
    productPrice: 100,
    productImage: 'url_to_image_1',
    productDescription: '这是商品一的描述',
  },
  {
    productId: '2',
    productName: '商品二',
    productPrice: 200,
    productImage: 'url_to_image_2',
    productDescription: '这是商品二的描述',
  },
  {
    productId: '3',
    productName: '商品三',
    productPrice: 300,
    productImage: 'url_to_image_3',
    productDescription: '这是商品三的描述',
  },
]);
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>