<template>
  <div class="p-16" v-loading="loading">
    <div
      v-if="product2Show.length"
      class="grid gap-4 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))]"
    >
      <ProductCard
        v-for="product in product2Show"
        :key="product.id"
        v-bind="product"
        @add-cart="shoppingCartStore.addProductToCart"
      />
    </div>
    <el-empty v-else description="没有想要的宝贝呢" />
  </div>
</template>

<script setup lang="ts">
import { useMyProductCardListStore } from "~/stores/ProductCardList";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const productCardListStore = useMyProductCardListStore();
const shoppingCartStore = useMyShoppingCartStore();

const { product2Show, loading } = storeToRefs(productCardListStore);
const route = useRoute();
await productCardListStore.fetchProductCardBySearch(
  route.query.keyword as string,
);
</script>
