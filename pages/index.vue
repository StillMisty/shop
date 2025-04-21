<template>
  <div>
    <div
      v-infinite-scroll="fetchNextPage"
      infinite-scroll-delay="100"
      infinite-scroll-distance="60"
      class="grid gap-4 p-16 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(240px,1fr))] w-full"
    >
      <template v-for="(products, index) in productPage?.pages" :key="index">
        <ProductCard
          v-for="product in products.content"
          :key="product.productId"
          v-bind="product"
          @add-cart="1"
        />
      </template>
    </div>
    <div
      v-if="isFetchingNextPage && hasNextPage"
      class="flex justify-center items-center w-full mt-4"
    >
      <RefreshCw class="animate-spin" />数据加载中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshCw } from "lucide-vue-next";
import { useProduct } from "~/api/useProduct";

const { productPageQuery } = useProduct();

const {
  data: productPage,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
} = productPageQuery;
</script>
