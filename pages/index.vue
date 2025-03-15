<template>
  <div
    class="grid gap-4 p-16 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full"
  >
    <ProductCard
      v-for="product in productCardList"
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
const productCardList = productCardListStore.productCardList;
</script>
