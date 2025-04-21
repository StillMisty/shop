<template>
  <div class="container mx-auto p-4">
    <ProductDetails :product="product" />
    <ProductGallery :images="product.productImage" />
    <ProductReviews :productId="product.productId" />
    <RelatedProducts :currentProductId="product.productId" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductApi } from '@/composables/useProductApi';
import { Product } from '@/types/Product';

const route = useRoute();
const product = ref<Product | null>(null);
const { getProductById } = useProductApi();

onMounted(async () => {
  const productId = route.params.id as string;
  product.value = await getProductById(productId);
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>