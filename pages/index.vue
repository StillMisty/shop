<template>
  <div class="h-full">
    <div v-if="isPending" class="flex items-center justify-center h-full">
      <LoaderCircle :size="64" class="animate-spin" />
    </div>
    <div
      v-else-if="isError"
      class="flex flex-col items-center justify-center h-full text-red-500"
    >
      <div class="flex mr-2"><TriangleAlert />加载失败，请稍后再试</div>
      <p>{{ error?.message }}</p>
      <RefreshCw
        :size="36"
        class="mt-2 cursor-pointer transition-all hover:rotate-180"
        @click="handleRefresh"
      />
    </div>
    <div
      v-if="productPage && productPage.pages"
      v-infinite-scroll="fetchNextPage"
      infinite-scroll-delay="100"
      infinite-scroll-distance="60"
      class="grid gap-4 p-16 max-w-7xl mx-auto grid-cols-[repeat(auto-fill,minmax(260px,1fr))]"
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
import { RefreshCw, TriangleAlert, LoaderCircle } from "lucide-vue-next";
import { useProduct } from "~/api/useProduct";

const { productPageQuery } = useProduct();

const {
  data: productPage,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isError,
  error,
  isPending,
} = productPageQuery;

const handleRefresh = () => {
  productPageQuery.refetch();
  ElMessage({
    message: "正在刷新数据...",
    type: "info",
  });
};
</script>
