<template>
  <div>
    <div
      class="flex justify-center items-center min-h-[calc(100vh-64px)]"
      v-if="loading"
    >
      <LoaderCircle :size="64" class="animate-spin" />
    </div>
    <div
      v-else
      class="grid gap-4 p-16 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full"
    >
      <ProductCard
        v-for="product in product2Show"
        :key="product.id"
        v-bind="product"
        @add-cart="shoppingCartStore.addProductToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import { useMyProductCardListStore } from "~/stores/ProductCardList";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const productCardListStore = useMyProductCardListStore();
const shoppingCartStore = useMyShoppingCartStore();

const { product2Show, loading } = storeToRefs(productCardListStore);
await productCardListStore.fetchProductCard();
</script>
