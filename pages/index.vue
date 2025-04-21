<template>
  <div
    v-loading="loading"
    class="grid gap-4 p-16 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full"
  >
    <ProductCard
      v-for="product in product2Show"
      :key="product.id"
      v-bind="product"
      @add-cart="shoppingCartStore.addProductToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { useMyProductCardListStore } from "~/stores/ProductCardList";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const productCardListStore = useMyProductCardListStore();
const shoppingCartStore = useMyShoppingCartStore();

const { product2Show, loading } = storeToRefs(productCardListStore);
await productCardListStore.fetchProductCard();
</script>
