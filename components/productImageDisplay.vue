<template>
  <div
    class="flex items-center justify-center bg-gray-100 rounded-sm overflow-hidden"
  >
    <el-image
      v-if="productImage"
      :src="productImage"
      class="w-full h-full"
      fit="cover"
      alt="商品图片"
    >
      <template #placeholder>
        <div class="flex items-center justify-center w-full h-full">
          <LoaderCircle :size="64" class="animate-spin" />
        </div>
      </template>
    </el-image>
    <el-empty v-else :image-size="120" description="暂无图片"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from "lucide-vue-next";

defineProps<{
  productImage: string | null | undefined;
}>();
</script>
