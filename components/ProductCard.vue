<template>
  <div class="w-64">
    <el-card shadow="hover" @click="handleInfo">
      <el-image
        :src="product.productImage || ''"
        class="w-full h-48"
        fit="cover"
      >
        <template #error>
          <div class="flex items-center justify-center w-full h-full">
            <ImageOff :size="64" />
          </div>
        </template>
        <template #placeholder>
          <div class="flex items-center justify-center w-full h-full">
            <LoaderCircle :size="64" class="animate-spin" />
          </div>
        </template>
      </el-image>
      <div class="p-4">
        <el-text size="large" truncated>{{ product.productName }}</el-text>
        <div class="flex justify-between items-center w-full">
          <div class="flex items-center gap-2">
            <el-text
              v-if="product.productDiscount < 1"
              type="info"
              size="small"
              tag="del"
              class="ml-1"
            >
              {{ product.productPrice?.toFixed(2) }}
            </el-text>
            <PriceDisplay
              :price="product.productPrice * product.productDiscount"
            />
          </div>
          <el-text class="text-xs">销量{{ product.productSoldCount }}</el-text>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ImageOff, LoaderCircle } from "lucide-vue-next";
import type { Product } from "~/types/Product";

const product = defineProps<Product>();
const router = useRouter();

const handleInfo = () => {
  router.push(`/products/${product.productId}`);
};
</script>
