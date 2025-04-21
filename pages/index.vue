<template>
  <div
    v-loading="loading"
    class="grid gap-4 p-16 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full"
  >
    <ProductCard
      v-for="product in productPage?.content"
      :key="product.productId"
      v-bind="product"
      @add-cart="shoppingCartStore.addProductToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { useProduct } from "~/api/useProduct";
import { useMyProductCardListStore } from "~/stores/ProductCardList";
import { useMyShoppingCartStore } from "~/stores/ShoppingCart";

const productCardListStore = useMyProductCardListStore();
const shoppingCartStore = useMyShoppingCartStore();

const { product2Show, loading } = storeToRefs(productCardListStore);
await productCardListStore.fetchProductCard();

const {
  productPageRequest,
  productPageQuery,
  updatePageRequest,
  goToPage,
  setPageSize,
  hasPrevPage,
  hasNextPage,
} = useProduct();

const { isPending, isError, data: productPage } = productPageQuery;
</script>
