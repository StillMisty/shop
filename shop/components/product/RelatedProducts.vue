<template>
  <div class="related-products">
    <h2 class="text-xl font-bold mb-4">Related Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCartCard
        v-for="product in relatedProducts"
        :key="product.productId"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import ProductCartCard from './ProductCartCard.vue';

const props = defineProps<{
  relatedProducts: Array<{
    productId: string;
    productName: string;
    productImage: string | null;
    productPrice: number;
    productDescription: string;
  }>;
}>();
</script>

<style scoped>
.related-products {
  margin-top: 2rem;
}
</style>