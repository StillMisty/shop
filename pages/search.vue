<template>
  <div v-loading="loading">
    <div
      v-if="product2Show.length"
      class="grid gap-4 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full p-16"
      v-auto-animate
    >
      <ProductCard
        v-for="product in product2Show"
        :key="product.id"
        v-bind="product"
        @add-cart="shoppingCartStore.addProductToCart"
      />
    </div>
    <div v-else class="p-16">
      <el-empty description="没有想要的宝贝呢" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyProductCardListStore } from "~/stores/ProductCardList";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";
import type { ProduceSearchType } from "~/types/DTO/ProductQuery";

const productCardListStore = useMyProductCardListStore();
const shoppingCartStore = useMyShoppingCartStore();

const { product2Show, loading } = storeToRefs(productCardListStore);

const route = useRoute();
onMounted(() => {
  productCardListStore.fetchProductCardByKeyword(
    route.query.keyword as string,
    route.query.type as ProduceSearchType,
  );
});
</script>
