<template>
  <div class="w-64">
    <el-card shadow="hover" @click="handleInfo">
      <img :src="props.image" class="w-full h-48 object-cover" />
      <div class="p-4">
        <el-text size="large" truncated>{{ props.name }}</el-text>
        <div class="flex justify-between items-center w-full">
          <PriceDisplay :price="props.price" />
          <el-button type="primary" @click.stop="addCart">加入购物车</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { ProductCardType } from "~/types/ProductCardType";

const emit = defineEmits(["addCart"]);
const props = defineProps<ProductCardType>();
const router = useRouter();

const handleInfo = () => {
  router.push(`/products/${props.id}`);
};

const addCart = () => {
  emit("addCart", props);
};
</script>
