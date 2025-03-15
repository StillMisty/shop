<template>
  <el-card shadow="hover" class="w-64">
    <img :src="props.image" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ props.name }}</h3>
      <div class="flex justify-between items-center mt-4">
        <span class="text-lg font-semibold">￥{{ props.price }}</span>
        <el-button type="primary" @click="addCart">加入购物车</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import type { ProductCardType } from "~/types/ProductCardType";

const emit = defineEmits(["addCart"]);
const props = defineProps<ProductCardType>();

const addCart = () => {
  emit("addCart", props);
};
</script>
