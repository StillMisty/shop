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
          <PriceDisplay :price="product.productPrice" />
          <el-button type="primary" @click.stop="addCart">加入购物车</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ImageOff, LoaderCircle } from "lucide-vue-next";
import type { Product } from "~/types/Product";

const emit = defineEmits(["addCart"]);
const product = defineProps<Product>();
const router = useRouter();

const handleInfo = () => {
  router.push(`/products/${product.productId}`);
};

const addCart = () => {
  emit("addCart", product);
};
</script>
